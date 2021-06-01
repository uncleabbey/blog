import React from 'react';
type InputProps = {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
  placeholder: string;
  handleBlur?: (e: React.FormEvent<HTMLInputElement>) => void;
};

const Input = ({
  type,
  name,
  value,
  onChange,
  className,
  placeholder,
  handleBlur,
}: InputProps): React.ReactElement => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={className}
      placeholder={placeholder}
      autoComplete="true"
      onBlur={handleBlur}
    />
  );
};

export default Input;
