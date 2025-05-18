// src/ProfilePage.tsx
import { useState } from 'react';
import styles from '../styles/ProfilePage.module.css';
import WeeklyAvailability from './WeeklyAvailability';
import DashboardInfo from './DashboardInfo';

const ProfilePage = () => {
	const [name, setName] = useState('');
	const [schedule, setSchedule] = useState({});

	const handleScheduleChange = (newSchedule: any) => {
		setSchedule(newSchedule);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Profile created with name:', name);
		console.log('Schedule availability:', schedule);
		// Navigate to next step or handle submission
	};

	return (
		<div className={styles.pageContainer}>
			{/* Main header */}
			<div className={styles.pageHeader}>
				<h1 className={styles.pageTitle}>Welcome to Your Productivity Dashboard</h1>
			</div>

			{/* Main content area with side-by-side layout */}
			<div className={styles.mainContent}>
				{/* Left side - Profile information */}
				<div className={styles.contentColumn}>
					<div className={styles.card}>
						<div className={styles.cardHeader}>
							<h2 className={styles.cardTitle}>Create Your Profile</h2>
						</div>

						<div className={styles.cardBody}>
							<form onSubmit={handleSubmit}>
								<div className={styles.profilePic}>
									<div className={styles.picPlaceholder}>
										<span>+</span>
									</div>
								</div>

								<div className={styles.inputGroup}>
									<input
										id="name"
										type="text"
										className={styles.input}
										value={name}
										onChange={(e) => setName(e.target.value)}
										placeholder="Name"
										required
									/>
								</div>
							</form>
						</div>
					</div>
				</div>

				{/* Right side - Dashboard info */}
				<div className={styles.contentColumn}>
					<div className={styles.card}>
						<div className={styles.cardHeader}>
							<h2 className={styles.cardTitle}>About the Dashboard</h2>
						</div>

						<div className={styles.cardBody}>
							<DashboardInfo />
						</div>
					</div>
				</div>
			</div>

			{/* Weekly Availability (full width) */}
			<div className={styles.fullWidthSection}>
				<div className={styles.card}>
					<div className={styles.cardHeader}>
						<h2 className={styles.cardTitle}>Weekly Availability</h2>
					</div>

					<div className={styles.cardBody}>
						<WeeklyAvailability onScheduleChange={handleScheduleChange} />

						<div className={styles.actionContainer}>
							<button type="button" className={styles.button} onClick={handleSubmit}>
								Save Profile & Continue
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;