import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuthSession } from './store/useAuthSession';
import { AppLayout } from './components/layout/AppLayout';
import { Login } from './pages/Login/Login';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Patients } from './pages/Patients/Patients';
import { Analytics } from './pages/Analytics/Analytics';
import { useServiceWorker } from './hooks/useServiceWorker';
import { Button } from './components/common/Button';
import { Bell } from 'lucide-react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuthSession();
  const location = useLocation();

  if (isLoading) {
    return <div className="flex-center" style={{ height: '100vh' }}>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// A global component to handle notifications for demonstration
const NotificationDemo = () => {
  const { permission, requestPermission, showNotification } = useServiceWorker();

  if (permission === 'denied') return null;

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 100 }}>
      <Button 
        onClick={() => {
          if (permission !== 'granted') {
            requestPermission().then(p => {
              if (p === 'granted') showNotification('Welcome!', { body: 'Notifications enabled successfully.' });
            });
          } else {
            showNotification('New Patient Alert', { 
              body: 'A critical patient has been admitted to ER.',
              tag: 'critical-alert'
            });
          }
        }}
        icon={<Bell size={18} />}
        style={{ borderRadius: '9999px', padding: '0.75rem 1.5rem', boxShadow: 'var(--shadow-lg)' }}
      >
        {permission !== 'granted' ? 'Enable Notifications' : 'Test Notification'}
      </Button>
    </div>
  );
};

export const App: React.FC = () => {
  const { initialize } = useAuthSession();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <NotificationDemo />
    </BrowserRouter>
  );
};

export default App;
