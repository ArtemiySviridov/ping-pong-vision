import './ProgressBar.scss';
import type { ProgressBarProps } from '@/shared/ui/progress-bar/ui/types.ts';
import { useEffect, useState } from 'react';

const ProgressBar = ({ progress, reverse = false }: ProgressBarProps) => {
  const [style, setStyle] = useState({ opacity: 0, width: '0' });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStyle({ opacity: 1, width: `${progress}%` });
    }, 200);

    return () => clearTimeout(timeout);
  }, [progress]);

  return (
    <div className={`progress-bar ${reverse ? 'progress-bar--reverse' : ''}`}>
      <div className="progress-bar__progress-circle">{progress}</div>
      <div
        className={`progress-bar__wrapper ${reverse ? 'progress-bar__wrapper--reverse' : ''}`}
      >
        <div
          className={`progress-bar__wrapper__progress ${reverse ? 'progress-bar__wrapper__progress--reverse' : ''}`}
          style={style}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
