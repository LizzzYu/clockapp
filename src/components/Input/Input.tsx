import React, { InputHTMLAttributes, useEffect, useState } from 'react';
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

const InputWrapper = styled.div(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  background: theme.colors.white,
  border: `2px solid ${theme.colors.white}`,
  borderRadius: '15px',
  padding: `0 ${theme.spacing(3)}`,
  transition: 'border-color 0.2s ease-in-out',

  '&:focus-within': {
    outline: 'none',
    border: `2px solid ${theme.colors.green}`,
  },
}));

const StyledInput = styled.input<{
  iconPosition: IconPosition;
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

  ${({ iconPosition, icon }) =>
    icon &&
    css`
    padding-${iconPosition === 'start' ? 'left' : 'right'}: 30px;
  `}
`;

const ResetInputIcon = styled(FontAwesomeIcon)<{
  iconPosition?: IconPosition;
}>`
  position: absolute;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.black};
  ${({ theme, iconPosition }) => css`
    right: ${iconPosition === 'end' ? theme.spacing(7) : theme.spacing(2)};
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

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  value?: string | number;
  placeholder?: string;
  icon?: IconDefinition;
  iconPosition?: IconPosition;
  iconSize?: SizeProp;
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
  onIconClick,
  onChange,
  ...props
}) => {
  const [inputValue, setInputValue] = useState<string | number | undefined>(
    value
  );

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
  };

  return (
    <InputContainer>
      {label && <Label>{label}</Label>}
      <InputWrapper>
        {icon && iconPosition === 'start' && (
          <IconWrapper iconPosition={iconPosition} onClick={onIconClick}>
            <FontAwesomeIcon icon={icon} size={iconSize} />
          </IconWrapper>
        )}
        <StyledInput
          {...props}
          onChange={onChange}
          type={type}
          value={inputValue}
          placeholder={placeholder}
          iconPosition={iconPosition}
          icon={icon}
        />
        {value && (
          <ResetInputIcon
            onClick={handleResetClick}
            icon={faTimes}
            iconPosition={iconPosition}
          />
        )}
        {icon && iconPosition === 'end' && (
          <IconWrapper iconPosition={iconPosition} onClick={onIconClick}>
            <FontAwesomeIcon icon={icon} size={iconSize} />
          </IconWrapper>
        )}
      </InputWrapper>
    </InputContainer>
  );
};

export default Input;
