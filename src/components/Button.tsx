import React from 'react';
type ButtonProps = {
  name: string;
  type: 'button' | 'submit' | 'reset';
  className: string;
  onClick?: () => void;
  disabled?: boolean;
};

const Button = ({
  name,
  type,
  onClick,
  className,
  disabled,
}: ButtonProps): React.ReactElement<HTMLButtonElement> => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {name}
    </button>
  );
};

export default Button;
