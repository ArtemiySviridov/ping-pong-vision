import './Status.scss';
import type { StatusProps } from './type.ts';

const Status = ({ variant, text }: StatusProps) => {
  return (
    <div className={`status status--${variant} text-xs-medium`}>
      <span>{text}</span>
    </div>
  );
};

export default Status;
