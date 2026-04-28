import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Activity, Users, BarChart3, LogOut, Menu, Bell } from 'lucide-react';
import { useAuthSession } from '../../store/useAuthSession';
import { Button } from '../common/Button';
import styles from './AppLayout.module.css';

export const AppLayout: React.FC = () => {
  const { user, logout } = useAuthSession();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <Activity size={20} /> },
    { path: '/patients', label: 'Patients', icon: <Users size={20} /> },
    { path: '/analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
  ];

  return (
    <div className={styles.layout}>
      {/* Mobile Overlay */}
      <div 
        className={`${styles.overlay} ${sidebarOpen ? styles.overlayOpen : ''}`} 
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.brand}>
          <Activity className={styles.brandIcon} size={28} />
          <span>HealthSaaS</span>
        </div>
        
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ marginTop: 'auto' }}>
          <Button 
            variant="secondary" 
            fullWidth 
            onClick={handleLogout}
            icon={<LogOut size={18} />}
          >
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        <header className={styles.header}>
          <div className="flex-center">
            <button 
              className={styles.menuButton}
              onClick={() => setSidebarOpen(true)}
              aria-label="Open Menu"
            >
              <Menu size={24} />
            </button>
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>Overview</h2>
          </div>

          <div className={styles.userInfo}>
            <button className="flex-center" style={{ position: 'relative', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--bg-hover)' }}>
              <Bell size={20} />
              <span style={{ position: 'absolute', top: '8px', right: '10px', width: '8px', height: '8px', backgroundColor: 'var(--danger)', borderRadius: '50%' }}></span>
            </button>
            <div className={styles.avatar}>
              {user?.displayName?.charAt(0) || 'U'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{user?.displayName}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user?.role}</span>
            </div>
          </div>
        </header>

        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
