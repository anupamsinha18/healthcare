import React, { useState, useEffect } from 'react';
import styles from './Analytics.module.css';

export const Analytics: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Small delay to trigger animation
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const weeklyData = [
    { day: 'Mon', patients: 45 },
    { day: 'Tue', patients: 52 },
    { day: 'Wed', patients: 38 },
    { day: 'Thu', patients: 65 },
    { day: 'Fri', patients: 48 },
    { day: 'Sat', patients: 25 },
    { day: 'Sun', patients: 18 },
  ];

  const maxPatients = Math.max(...weeklyData.map(d => d.patients));

  return (
    <div className={styles.container}>
      <h1 className="text-2xl font-bold">Analytics Overview</h1>
      <p className="text-secondary mt-2">Track patient intake and performance metrics.</p>

      <div className={styles.chartGrid}>
        <div className={styles.chartCard}>
          <h2 className={styles.chartTitle}>Patient Intake (This Week)</h2>
          <div className={styles.barChart}>
            {weeklyData.map((data, idx) => (
              <div key={idx} className={styles.barContainer}>
                <div 
                  className={styles.bar} 
                  style={{ 
                    height: mounted ? `${(data.patients / maxPatients) * 100}%` : '0%',
                    backgroundColor: data.patients > 50 ? 'var(--accent-primary)' : 'var(--accent-hover)'
                  }}
                  title={`${data.patients} patients`}
                />
                <span className={styles.barLabel}>{data.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.chartCard}>
          <h2 className={styles.chartTitle}>Patient Demographics</h2>
          <div className="flex-center" style={{ height: '200px' }}>
            <div style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: 'conic-gradient(var(--accent-primary) 0% 60%, var(--success) 60% 85%, var(--danger) 85% 100%)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-panel)'
              }} />
            </div>
          </div>
          <div className="flex-center" style={{ gap: '1.5rem', marginTop: '1rem' }}>
            <div className="flex-center" style={{ gap: '0.5rem', fontSize: '0.875rem' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--accent-primary)' }}></span> Adults (60%)
            </div>
            <div className="flex-center" style={{ gap: '0.5rem', fontSize: '0.875rem' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--success)' }}></span> Seniors (25%)
            </div>
            <div className="flex-center" style={{ gap: '0.5rem', fontSize: '0.875rem' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--danger)' }}></span> Pediatrics (15%)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
