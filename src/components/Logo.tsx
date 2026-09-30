import React from 'react';

export interface LogoProps {
  customUrl?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'header';
  layout?: 'horizontal' | 'stacked';
  onClick?: () => void;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  customUrl,
  size = 'md',
  layout = 'stacked', // Defaults to the official emblem logo that the user sent
  onClick,
  className = '',
}) => {
  const isHorizontal = layout === 'horizontal';
  const logoSrc = customUrl
    ? customUrl
    : isHorizontal
    ? '/cinelab-logo.svg'
    : '/cinelab-logo-vertical.svg';

  // Generous dimensions to guarantee that the logo, subtitle and slogan are prominently visible and crisp
  const stackedSizeClasses: Record<string, string> = {
    sm: 'h-12 sm:h-16 w-auto max-w-[160px] sm:max-w-[200px]',
    md: 'h-16 sm:h-22 md:h-26 w-auto max-w-[220px] sm:max-w-[320px]',
    header: 'h-10 xs:h-12 sm:h-[120px] md:h-[148px] lg:h-[175px] xl:h-[195px] w-auto max-w-[130px] xs:max-w-[170px] sm:max-w-[460px] md:max-w-[580px] lg:max-w-[680px] xl:max-w-[760px]',
    lg: 'h-20 sm:h-28 md:h-32 w-auto max-w-[260px] sm:max-w-[360px]',
    xl: 'h-28 sm:h-44 md:h-56 w-auto max-w-[340px] sm:max-w-[680px]',
  };

  const horizontalSizeClasses: Record<string, string> = {
    sm: 'h-10 sm:h-14 w-auto max-w-[180px] sm:max-w-[220px]',
    md: 'h-14 sm:h-20 w-auto max-w-[240px] sm:max-w-[300px]',
    header: 'h-9 xs:h-10 sm:h-[105px] md:h-[125px] lg:h-[150px] xl:h-[170px] w-auto max-w-[135px] xs:max-w-[180px] sm:max-w-[520px] md:max-w-[640px]',
    lg: 'h-20 sm:h-28 w-auto max-w-[320px] sm:max-w-[400px]',
    xl: 'h-28 sm:h-44 w-auto max-w-[400px] sm:max-w-[600px]',
  };

  const sizeClasses = isHorizontal ? horizontalSizeClasses : stackedSizeClasses;

  return (
    <div
      onClick={onClick}
      id="cinelab-logo-container"
      className={`inline-flex items-center justify-center max-w-full cursor-pointer select-none group transition-transform duration-150 active:scale-98 ${className}`}
      title="CINELAB – Cinema & Audiovisual"
    >
      <img
        src={logoSrc}
        alt="CINELAB – Cinema & Audiovisual • Onde nascem os próximos cineastas"
        className={`object-contain block max-w-full filter drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)] transition-all duration-200 group-hover:brightness-110 group-hover:drop-shadow-[0_0_25px_rgba(245,158,11,0.5)] ${sizeClasses[size] || sizeClasses.md}`}
        loading="eager"
      />
    </div>
  );
};

