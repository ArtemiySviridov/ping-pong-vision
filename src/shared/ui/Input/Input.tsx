import './Input.scss';
import { forwardRef, useState, type InputHTMLAttributes } from 'react';
import { Eye, EyeClosed } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    label,
    type = 'text',
    name,
    placeholder,
    error = false,
    errorMessage = '',
    className = '',
    ...rest
  } = props;

  // Переключатель видимости пароля
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordField = type === 'password';
  const currentType = isPasswordField && isPasswordVisible ? 'text' : type;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const inputId = `input-${name}`;
  const errorId = `error-${name}`;

  return (
    <div className={`input-wrapper ${error ? 'input-wrapper--error' : ''}`}>
      {label && (
        <label
          className="input-wrapper__label text-sm-regular"
          htmlFor={inputId}
        >
          {label}
        </label>
      )}

      <div className="input-wrapper__container">
        <input
          ref={ref}
          id={inputId}
          type={currentType}
          name={name}
          placeholder={placeholder}
          autoComplete="off"
          className={`input-wrapper__input text-xs-regular ${className}`}
          {...rest}
        />

        {isPasswordField && (
          <span
            className="input-wrapper__eye-icon"
            onClick={togglePasswordVisibility}
            tabIndex={-1}
          >
            {isPasswordVisible ? (
              <Eye strokeWidth={1.5} />
            ) : (
              <EyeClosed strokeWidth={1.5} />
            )}
          </span>
        )}
      </div>

      <p
        id={errorId}
        className={`input-wrapper__message text-xs-regular ${
          error ? 'input-wrapper__error' : 'input-wrapper__helper'
        }`}
      >
        {errorMessage ?? ' '}
      </p>
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
