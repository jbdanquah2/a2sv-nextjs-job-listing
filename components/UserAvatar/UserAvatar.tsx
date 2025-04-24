'use client';

import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import './UserAvatar.scss';

export default function UserAvatar() {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!session?.user) return null;

  return (
    <div className="user-avatar" ref={dropdownRef}>
      <button
        className="user-avatar__button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        aria-label="User menu"
      >
        <Image
          src={session.user.image || '/default-avatar.png'}
          alt={session.user.name || 'User avatar'}
          width={32}
          height={32}
          className="user-avatar__image"
        />
      </button>

      {isDropdownOpen && (
        <div className="user-avatar__dropdown">
          <div className="user-avatar__user-info">
            <p className="user-avatar__name">{session.user.name}</p>
            <p className="user-avatar__email">{session.user.email}</p>
          </div>
          <div className="user-avatar__menu">
            <button
              className="user-avatar__menu-item"
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 