import { useState, useRef, useEffect } from 'react';
import styles from '../styles/WeeklyAvailability.module.css';

interface WeeklyAvailabilityProps {
    onScheduleChange: (schedule: any) => void;
}

const WeeklyAvailability: React.FC<WeeklyAvailabilityProps> = ({ onScheduleChange }) => {
    // Define days and hours
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const hours = Array.from({ length: 17 }, (_, i) => i + 7); // 7am to 11pm (7-23)

    // State for schedule availability
    const [schedule, setSchedule] = useState(() => {
        const initialSchedule: { [key: string]: { [key: number]: boolean } } = {};
        days.forEach(day => {
            initialSchedule[day] = {};
            hours.forEach(hour => {
                initialSchedule[day][hour] = false;
            });
        });
        return initialSchedule;
    });

    // Refs and state for drag selection
    const isDraggingRef = useRef(false);
    const selectionValueRef = useRef(false);
    const [lastSelected, setLastSelected] = useState<{ day: string, hour: number } | null>(null);

    // Handle mouse down on a time slot
    const handleMouseDown = (day: string, hour: number) => {
        isDraggingRef.current = true;

        // Set the selection value (opposite of current value)
        selectionValueRef.current = !schedule[day][hour];

        // Update the current time slot
        const newSchedule = {
            ...schedule,
            [day]: {
                ...schedule[day],
                [hour]: selectionValueRef.current
            }
        };

        setSchedule(newSchedule);
        onScheduleChange(newSchedule);
        setLastSelected({ day, hour });
    };

    // Handle mouse enter on a time slot during dragging
    const handleMouseEnter = (day: string, hour: number) => {
        if (!isDraggingRef.current || !lastSelected) return;

        // If this is a new cell, update it
        if (lastSelected.day !== day || lastSelected.hour !== hour) {
            const newSchedule = {
                ...schedule,
                [day]: {
                    ...schedule[day],
                    [hour]: selectionValueRef.current
                }
            };

            setSchedule(newSchedule);
            onScheduleChange(newSchedule);
            setLastSelected({ day, hour });
        }
    };

    // Handle mouse up to end dragging
    const handleMouseUp = () => {
        isDraggingRef.current = false;
        setLastSelected(null);
    };

    // Add event listeners for mouse up outside of time slots
    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseleave', handleMouseUp);

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseleave', handleMouseUp);
        };
    }, []);

    // Format hour for display (e.g., "7 AM", "1 PM")
    const formatHour = (hour: number) => {
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : hour;
        return `${displayHour} ${period}`;
    };

    // Clear all selections
    const clearAll = () => {
        const clearedSchedule: { [key: string]: { [key: number]: boolean } } = {};
        days.forEach(day => {
            clearedSchedule[day] = {};
            hours.forEach(hour => {
                clearedSchedule[day][hour] = false;
            });
        });
        setSchedule(clearedSchedule);
        onScheduleChange(clearedSchedule);
    };

    return (
        <div className={styles.container}>
            <p className={styles.description}>
                Click or drag to select the time slots when you're typically available to work on personal goals.
            </p>

            <div className={styles.scheduleGrid}>
                {/* Time block labels column */}
                <div className={styles.timeBlockColumn}>
                    <div className={styles.timeBlockCorner}></div>
                    {hours.map(hour => (
                        <div key={hour} className={styles.timeBlockLabel}>
                            {formatHour(hour)}
                        </div>
                    ))}
                </div>

                {/* Day columns with time blocks */}
                {days.map(day => (
                    <div key={day} className={styles.dayColumn}>
                        <div className={styles.dayLabel}>{day}</div>
                        {hours.map(hour => (
                            <div
                                key={`${day}-${hour}`}
                                className={`${styles.timeBlock} ${schedule[day][hour] ? styles.available : ''}`}
                                onMouseDown={() => handleMouseDown(day, hour)}
                                onMouseEnter={() => handleMouseEnter(day, hour)}
                            ></div>
                        ))}
                    </div>
                ))}
            </div>

            <div className={styles.scheduleActions}>
                <div className={styles.legendContainer}>
                    <div className={styles.legend}>
                        <div className={`${styles.legendColor} ${styles.available}`}></div>
                        <span>Available</span>
                    </div>
                    <div className={styles.legend}>
                        <div className={styles.legendColor}></div>
                        <span>Busy</span>
                    </div>
                </div>

                <button
                    type="button"
                    className={styles.presetButton}
                    onClick={clearAll}
                >
                    Clear All
                </button>
            </div>
        </div>
    );
};

export default WeeklyAvailability;