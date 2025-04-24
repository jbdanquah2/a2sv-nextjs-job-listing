'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import UserAvatar from '../UserAvatar/UserAvatar';
import './Navbar.scss';

const Navbar = () => {
  const { data: session } = useSession();

  console.log("session###", session);

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__content">
          {/* Company Logo */}
          <Link href="/" className="navbar__logo">
            <Image
              src="/logo.svg"
              alt="JobList Logo"
              width={40}
              height={40}
              priority
            />
            <span className="navbar__logo-text">JobList</span>
          </Link>

          {/* Navigation Links */}
          <div className="navbar__nav">
            <Link href="/" className="navbar__link">
              Jobs
            </Link>
            <Link href="/companies" className="navbar__link">
              Companies
            </Link>
          </div>

          {/* Auth Section */}
          <div className="navbar__auth">
            {session ? (
              <UserAvatar />
            ) : (
              <Link href="/login" className="navbar__login-button">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 