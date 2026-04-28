import React, { useEffect } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Users, AlertCircle, Activity, ChevronRight } from 'lucide-react';
import { usePatientStore } from '../../store/usePatientStore';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

export const Dashboard: React.FC = () => {
  const { patients, fetchPatientRecords, isLoading } = usePatientStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (patients.length === 0) {
      fetchPatientRecords();
    }
  }, [patients.length, fetchPatientRecords]);

  const criticalPatientsCount = patients.filter(p => p.status === 'Critical').length;
  const stablePatientsCount = patients.filter(p => p.status === 'Stable').length;

  return (
    <div className={styles.container}>
      <h1 className="text-2xl font-bold mb-6">Welcome to Dashboard</h1>

      <div className={styles.statsGrid}>
        <Card>
          <div className={styles.statCard}>
            <div className={`${styles.iconBox} ${styles.iconPrimary}`}>
              <Users size={24} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>Total Patients</span>
              <span className={styles.statValue}>{isLoading ? '-' : patients.length}</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className={styles.statCard}>
            <div className={`${styles.iconBox} ${styles.iconDanger}`}>
              <AlertCircle size={24} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>Critical Condition</span>
              <span className={styles.statValue}>{isLoading ? '-' : criticalPatientsCount}</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className={styles.statCard}>
            <div className={`${styles.iconBox} ${styles.iconSuccess}`}>
              <Activity size={24} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>Stable / Recovering</span>
              <span className={styles.statValue}>{isLoading ? '-' : stablePatientsCount + patients.filter(p => p.status === 'Recovering').length}</span>
            </div>
          </div>
        </Card>
      </div>

      <div className={styles.recentSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent Patients</h2>
          <Button variant="secondary" onClick={() => navigate('/patients')}>
            View All <ChevronRight size={16} />
          </Button>
        </div>

        {isLoading ? (
          <div className="flex-center py-8">Loading recent patients...</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '1rem 0', fontWeight: 500 }}>Name</th>
                  <th style={{ padding: '1rem 0', fontWeight: 500 }}>Diagnosis</th>
                  <th style={{ padding: '1rem 0', fontWeight: 500 }}>Status</th>
                  <th style={{ padding: '1rem 0', fontWeight: 500 }}>Last Visit</th>
                </tr>
              </thead>
              <tbody>
                {patients.slice(0, 3).map(patient => (
                  <tr key={patient.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '1rem 0', fontWeight: 500 }}>{patient.name}</td>
                    <td style={{ padding: '1rem 0', color: 'var(--text-secondary)' }}>{patient.diagnosis}</td>
                    <td style={{ padding: '1rem 0' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        backgroundColor: patient.status === 'Critical' ? 'rgba(239, 68, 68, 0.1)' : 
                                       patient.status === 'Recovering' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                        color: patient.status === 'Critical' ? 'var(--danger)' : 
                               patient.status === 'Recovering' ? 'var(--accent-primary)' : 'var(--success)',
                      }}>
                        {patient.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 0', color: 'var(--text-secondary)' }}>{patient.lastVisit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
