'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import Loading from '../loading-page';
import './login.scss';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const result = await signIn('google', {
        callbackUrl: '/',
        redirect: true,
      });

      
    } catch (error) {
      console.error('Error signing in with Google:', error);
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

        <div className="footer">
          <p>
            By signing in, you agree to our{' '}
            <a href="#">Terms of Service</a> and{' '}
            <a href="#">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
} 