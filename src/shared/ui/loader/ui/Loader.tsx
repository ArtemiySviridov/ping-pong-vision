import './Loader.scss';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Loader = ({ size = 'medium', className = '' }: LoaderProps) => {
  return (
    <div className={`loader loader--${size} ${className}`}>
      <div className="loader__spinner"></div>
    </div>
  );
};

export default Loader;
