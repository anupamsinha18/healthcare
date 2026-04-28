import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthSession } from '../../store/useAuthSession';
import { signInWithEmailAndPassword, signUpWithEmailAndPassword, signInWithGoogle } from '../../services/authService';
import { Button } from '../../components/common/Button';
import { Activity } from 'lucide-react';
import styles from './Login.module.css';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  
  const { login, error, setError } = useAuthSession();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = isSignUp 
        ? await signUpWithEmailAndPassword(email, password)
        : await signInWithEmailAndPassword(email, password);
      login(response.user);
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error("Login error:", err);
      let errorMessage = err.message || 'An error occurred during login.';
      if (err.code === 'auth/invalid-email') errorMessage = 'Invalid email address.';
      if (err.code === 'auth/weak-password') errorMessage = 'Password must be at least 6 characters.';
      if (err.code === 'auth/email-already-in-use') errorMessage = 'This email is already registered. Please sign in instead.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') errorMessage = 'Invalid credentials. Please try again.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      const response = await signInWithGoogle();
      login(response.user);
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error("Google Login error:", err);
      setError(err.message || 'Failed to sign in with Google.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className="flex-center" style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>
            <Activity size={48} />
          </div>
          <h1 className={styles.title}>{isSignUp ? 'Create an Account' : 'Welcome Back'}</h1>
          <p className={styles.subtitle}>{isSignUp ? 'Sign up for a new healthcare portal account' : 'Sign in to your healthcare portal'}</p>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleEmailSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className={styles.input}
              placeholder="admin@healthcare.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className={styles.input}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" fullWidth isLoading={isSubmitting}>
            {isSignUp ? 'Sign Up with Email' : 'Sign In with Email'}
          </Button>

          <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.875rem' }}>
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <button 
              type="button" 
              onClick={() => { setIsSignUp(!isSignUp); setError(null); }} 
              style={{ color: 'var(--accent-primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }}></div>
          <span style={{ padding: '0 1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>OR</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }}></div>
        </div>

        <Button 
          variant="secondary" 
          fullWidth 
          onClick={handleGoogleLogin}
          icon={
            <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          }
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};
