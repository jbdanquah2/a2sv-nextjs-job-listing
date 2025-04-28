'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import Loading from '../loading-page';
import { login } from '@/lib/services/authService';
import './login.scss';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      setIsLoading(true);
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        return;
      }

      console.log("##result", result);

      // Redirect to home page
      router.push('/');
    } catch (error) {
      console.error('Error signing in:', error);
      setError('An error occurred during sign in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      {isLoading && <Loading fullScreen={true} />}
      <div className="login-card">
        <div className="header">
          <div className="title">
            <h2>Welcome Back</h2>
            <p>Sign in to access your job listings</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Google Sign In - Commented out for now
        <div className="divider"></div>
        <div className="sign-in-section">
          <button 
            onClick={handleGoogleSignIn} 
            className="google-button"
            disabled={isLoading}
          >
            <FcGoogle className="google-icon" />
            {isLoading ? 'Signing in...' : 'Continue with Google'}
          </button>
        </div>
        */}

        <div className="footer">
          <p>
            Don't have an account?{' '}
            <Link href="/signup">Sign up</Link>
          </p>
          <p className="terms">
            By signing in, you agree to our{' '}
            <a href="#">Terms of Service</a> and{' '}
            <a href="#">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
} 