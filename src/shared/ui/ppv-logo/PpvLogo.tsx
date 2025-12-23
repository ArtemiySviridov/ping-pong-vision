import './PpvLogo.scss';
import ppvLogoLarge from '@/assets/icons/ppv-logo-l.svg';
import ppvLogoSmall from '@/assets/icons/menu/menu-logo.svg';
import React from 'react';

interface PpvLogoProps {
  size: 'small' | 'large';
  textStyle?: 'text-lg-medium' | 'text-xl-bold';
  className?: string;
}

const PpvLogo: React.FC<PpvLogoProps> = ({ size, textStyle }) => {
  return (
    <div className="ppv-logo">
      <img
        className={`ppv-logo__icon ppv-logo__icon--${size}`}
        src={size === 'large' ? ppvLogoLarge : ppvLogoSmall}
        alt="menu logo"
      />
      <p className={`${textStyle}`}>PingPongVision</p>
    </div>
  );
};

export default PpvLogo;
