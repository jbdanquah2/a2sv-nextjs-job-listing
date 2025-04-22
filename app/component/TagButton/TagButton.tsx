'use client'
import React from 'react';
import './TagButton.scss';

export type TagButtonVariant = 'location' | 'category-1' | 'category-2' | `category-${number}`;

type TagButtonProps = {
    children: React.ReactNode;
    variant: TagButtonVariant;
    noBorder?: boolean;
    onClick?: () => void;
};

export default function TagButton({ children, variant, noBorder, onClick }: TagButtonProps) {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 720);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const truncateText = (text: string) => {
        if (isMobile && typeof text === 'string' && text.length > 12) {
            return text.slice(0, 12) + '...';
        }
        return text;
    };

    return (
        <button 
            className={`tag-button tag-button--${variant} ${noBorder ? 'no-border' : ''}`}
            onClick={onClick}>
            {typeof children === 'string' ? truncateText(children) : children}
        </button>
    );
} 