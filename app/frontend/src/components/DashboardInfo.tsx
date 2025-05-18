// src/components/DashboardInfo.tsx
import React from 'react';
import styles from '../styles/DashboardInfo.module.css';

const DashboardInfo: React.FC = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>How It Works</h2>

            <div className={styles.flowSteps}>
                <div className={styles.flowStep}>
                    <div className={styles.flowStepNumber}>1</div>
                    <div className={styles.flowStepContent}>
                        <h3 className={styles.flowStepTitle}>Create Your Profile</h3>
                        <p className={styles.flowStepDescription}>
                            Set up your basic information and weekly availability to help us personalize your experience.
                        </p>
                    </div>
                </div>

                <div className={styles.flowStep}>
                    <div className={styles.flowStepNumber}>2</div>
                    <div className={styles.flowStepContent}>
                        <h3 className={styles.flowStepTitle}>Set Your Goals</h3>
                        <p className={styles.flowStepDescription}>
                            Define 1-3 personal goals you want to focus on with detailed time commitments.
                        </p>
                    </div>
                </div>

                <div className={styles.flowStep}>
                    <div className={styles.flowStepNumber}>3</div>
                    <div className={styles.flowStepContent}>
                        <h3 className={styles.flowStepTitle}>Create or Generate Tasks</h3>
                        <p className={styles.flowStepDescription}>
                            Add specific tasks to complete or let the system suggest a curriculum based on your goals.
                        </p>
                    </div>
                </div>

                <div className={styles.flowStep}>
                    <div className={styles.flowStepNumber}>4</div>
                    <div className={styles.flowStepContent}>
                        <h3 className={styles.flowStepTitle}>View Your Weekly Plan</h3>
                        <p className={styles.flowStepDescription}>
                            Get a personalized schedule that fits your goals into your available time slots.
                        </p>
                    </div>
                </div>
            </div>

            <div className={styles.benefitsSection}>
                <h2 className={styles.title}>Why Use This Dashboard?</h2>
                <ul className={styles.benefitsList}>
                    <li className={styles.benefitsItem}>
                        <strong>Save Time</strong> by automating your weekly planning
                    </li>
                    <li className={styles.benefitsItem}>
                        <strong>Stay Focused</strong> with clear, prioritized tasks
                    </li>
                    <li className={styles.benefitsItem}>
                        <strong>Balance Goals</strong> across different areas of your life
                    </li>
                    <li className={styles.benefitsItem}>
                        <strong>Make Progress</strong> by consistently working towards what matters
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardInfo;