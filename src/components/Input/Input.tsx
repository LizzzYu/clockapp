import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const InputContainer = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  width: '100%',
}));

const Label = styled.label(({ theme }) => ({
  fontSize: '16px',
  fontWeight: '600',
  letterSpacing: '1px',
  color: theme.colors.white,
}));

const InputWrapper = styled.div<{ errorMessage?: string }>(
  ({ theme, errorMessage }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    background: theme.colors.white,
    border: `2px solid ${errorMessage ? theme.colors.red : theme.colors.white}`,
    borderRadius: '15px',
    padding: `0 ${theme.spacing(6)} 0 ${theme.spacing(3)}`,
    transition: 'border-color 0.2s ease-in-out',

    '&:focus-within': {
      outline: 'none',
      border: `2px solid ${
        errorMessage ? theme.colors.red : theme.colors.green
      }`,
    },
  })
);

const StyledInput = styled.input<{
  iconposition: IconPosition;
  icon?: IconDefinition;
}>`
  box-sizing: border-box;
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  line-height: 16px;
  height: 44px;
  color: ${({ theme }) => theme.colors.secondaryBlack};
  background-color: transparent;

  &::placeholder {
    color: ${({ theme }) => theme.colors.lightGrey};
    font-weight: 300;
    font-size: 14px;
  }

  &:focus {
    outline: none;
  }

  ${({ iconposition, icon }) =>
    icon &&
    css`
    padding-${iconposition === 'start' ? 'left' : 'right'}: 30px;
  `}
`;

const ResetInputIcon = styled(FontAwesomeIcon)<{
  iconposition?: IconPosition;
}>`
  position: absolute;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.black};
  ${({ theme, iconposition }) => css`
    right: ${iconposition === 'end' ? theme.spacing(7) : theme.spacing(2)};
  `}
`;

const IconWrapper = styled.div<{ iconPosition: IconPosition }>(
  ({ theme, iconPosition }) => ({
    position: 'absolute',
    cursor: 'pointer',
    color: theme.colors.black,
    [iconPosition === 'end' ? 'right' : 'left']: theme.spacing(2),
  })
);

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.red};
  font-size: 14px;
`;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  value?: string | number;
  placeholder?: string;
  icon?: IconDefinition;
  iconPosition?: IconPosition;
  iconSize?: SizeProp;
  errorMessage?: string;
  onIconClick?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

type IconPosition = 'start' | 'end';

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
    onChange?.({
      target: { value: '' },
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
