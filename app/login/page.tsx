'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import './login.scss';

export default function LoginPage() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn('google', {
        callbackUrl: '/',
        redirect: true,
      });

      if (result?.ok) {
        router.push('/');
      }
      
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="header">
          <div className="title">
            <h2>Welcome Back</h2>
            <p>Sign in to access your job listings</p>
          </div>
        </div>

        <div className="divider"></div>

        <div className="sign-in-section">
          <button onClick={handleGoogleSignIn} className="google-button">
            <FcGoogle className="google-icon" />
            Continue with Google
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