import React, { useState, useEffect } from 'react';
import { usePatientStore } from '../../store/usePatientStore';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { LayoutGrid, List, Search } from 'lucide-react';
import styles from './Patients.module.css';

export const Patients: React.FC = () => {
  const { patients, fetchPatientRecords, isLoading } = usePatientStore();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (patients.length === 0) {
      fetchPatientRecords();
    }
  }, [patients.length, fetchPatientRecords]);

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    if (status === 'Critical') return 'var(--danger)';
    if (status === 'Recovering') return 'var(--accent-primary)';
    return 'var(--success)';
  };

  const getStatusBg = (status: string) => {
    if (status === 'Critical') return 'rgba(239, 68, 68, 0.1)';
    if (status === 'Recovering') return 'rgba(59, 130, 246, 0.1)';
    return 'rgba(34, 197, 94, 0.1)';
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Patient Directory</h1>
        <div className="flex-center" style={{ gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search patients..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '0.5rem 1rem 0.5rem 2.5rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-panel)',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
          </div>
          <div className={styles.viewToggle}>
            <button 
              className={`${styles.toggleBtn} ${view === 'grid' ? styles.toggleBtnActive : ''}`}
              onClick={() => setView('grid')}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              className={`${styles.toggleBtn} ${view === 'list' ? styles.toggleBtnActive : ''}`}
              onClick={() => setView('list')}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex-center py-12">Loading patients...</div>
      ) : filteredPatients.length === 0 ? (
        <div className="flex-center py-12" style={{ flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)' }}>
          <Search size={48} />
          <p>No patients found matching "{searchQuery}"</p>
        </div>
      ) : view === 'grid' ? (
        <div className={styles.gridView}>
          {filteredPatients.map(patient => (
            <Card key={patient.id} interactive>
              <div className={styles.patientCard}>
                <div className={styles.patientHeader}>
                  <div>
                    <h3 className={styles.patientName}>{patient.name}</h3>
                    <span className={styles.patientId}>{patient.id}</span>
                  </div>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    backgroundColor: getStatusBg(patient.status),
                    color: getStatusColor(patient.status)
                  }}>
                    {patient.status}
                  </span>
                </div>
                
                <div className={styles.patientDetails}>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Diagnosis</span>
                    <span>{patient.diagnosis}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Age / Gender</span>
                    <span>{patient.age} • {patient.gender}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Last Visit</span>
                    <span>{patient.lastVisit}</span>
                  </div>
                </div>

                <div style={{ marginTop: '0.5rem' }}>
                  <Button variant="secondary" fullWidth>View Full Profile</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className={styles.listView}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient Name</th>
                <th>Diagnosis</th>
                <th>Status</th>
                <th>Age / Gender</th>
                <th>Last Visit</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map(patient => (
                <tr key={patient.id}>
                  <td style={{ color: 'var(--text-muted)' }}>{patient.id}</td>
                  <td style={{ fontWeight: 500 }}>{patient.name}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{patient.diagnosis}</td>
                  <td>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      backgroundColor: getStatusBg(patient.status),
                      color: getStatusColor(patient.status)
                    }}>
                      {patient.status}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{patient.age} / {patient.gender.charAt(0)}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{patient.lastVisit}</td>
                  <td>
                    <Button variant="secondary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}>View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
