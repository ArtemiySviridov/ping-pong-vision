import './ButtonGroup.scss';
import React from 'react';

interface Options {
  value: string;
  label: string;
}

interface ButtonGroupProps {
  options: Options[];
  value: string;
  onChange: (value: string) => void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <div className="button-group">
      {options.map((option) => (
        <button
          key={option.value}
          className={`button-group__button ${value === option.value ? 'active' : ''} text-sm-regular`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
