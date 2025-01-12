import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { InputProps } from './Input.types';
import {
  ErrorMessage,
  IconWrapper,
  InputContainer,
  InputWrapper,
  Label,
  ResetInputIcon,
  StyledInput,
} from './Input.styles';

const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  value,
  placeholder,
  icon,
  iconPosition = 'start',
  iconSize,
  errorMessage,
  onIconClick,
  onChange,
  ...props
}) => {
  const [inputValue, setInputValue] = useState<string | number | undefined>(
    value
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // sync input value with parent value
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // reset input value
  const handleResetClick = () => {
    setInputValue('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    onChange?.({
      target: inputRef.current!,
    } as React.ChangeEvent<HTMLInputElement>);
    inputRef.current?.focus();
  };

  return (
    <InputContainer>
      {label && <Label>{label}</Label>}
      <InputWrapper errorMessage={errorMessage}>
        {icon && iconPosition === 'start' && (
          <IconWrapper iconPosition={iconPosition} onClick={onIconClick}>
            <FontAwesomeIcon icon={icon} size={iconSize} />
          </IconWrapper>
        )}
        <StyledInput
          {...props}
          ref={inputRef}
          onChange={onChange}
          type={type}
          value={inputValue}
          placeholder={placeholder}
          iconposition={iconPosition}
          icon={icon}
        />
        {value && (
          <ResetInputIcon
            onClick={handleResetClick}
            icon={faTimes}
            iconposition={iconPosition}
          />
        )}
        {icon && iconPosition === 'end' && (
          <IconWrapper iconPosition={iconPosition} onClick={onIconClick}>
            <FontAwesomeIcon icon={icon} size={iconSize} />
          </IconWrapper>
        )}
      </InputWrapper>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </InputContainer>
  );
};

export default Input;
