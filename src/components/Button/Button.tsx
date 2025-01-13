import React from 'react';
import styled from '@emotion/styled';

const ButtonWrapper = styled.div<{
  paddingTop: number | undefined;
  position: ButtonPosition;
  variant: ButtonVariant;
}>`
  width: ${({ variant }) => (variant === 'filled' ? '100%' : 'auto')};
  position: relative;
  display: flex;
  flex-direction: ${({ position }) =>
    position === 'left' ? 'row' : 'row-reverse'};
  padding-top: ${({ paddingTop }) => paddingTop && `${paddingTop}px`};
`;

const StyledButton = styled.button<{
  disabled: boolean;
  variant: ButtonVariant;
  fontSize?: number;
}>(({ theme, disabled, variant, fontSize }) => {
  const isFilled = variant === 'filled';
  const isText = variant === 'text';

  return {
    width: isFilled ? '100%' : 'auto',
    height: isFilled ? '50px' : 'auto',
    borderRadius: isFilled ? '15px' : '0',
    backgroundColor: isFilled
      ? disabled
        ? theme.colors.grey
        : theme.colors.raspberry
      : 'transparent',
    color: theme.colors.white,
    fontSize: fontSize ? `${fontSize}px` : isFilled ? '16px' : '14px',
    fontWeight: isFilled ? '500' : '700',
    textDecoration: isText && !disabled ? 'underline' : 'none',
    outline: 'none',
    appearance: 'none',
    border: 'none',
    lineHeight: '22px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease-in-out',

    '&:hover': {
      backgroundColor: isFilled
        ? disabled
          ? theme.colors.grey
          : theme.colors.lightRaspberry
        : 'transparent',
      color: isFilled ? theme.colors.white : theme.colors.green,
    },
  };
});

const ErrorMessage = styled.div<{ variant: ButtonVariant }>`
  position: absolute;
  bottom: ${({ theme, variant }) =>
    `-${theme.spacing(variant === 'filled' ? 4 : 3)}`};
  ${({ variant }) =>
    variant === 'filled'
      ? `
        left: 0;
        right: unset;
      `
      : `
        left: unset;
        right: 0;
      `}
  color: ${({ theme }) => theme.colors.red};
  font-size: 14px;
  margin-top: 8px;
`;

type ButtonVariant = 'filled' | 'text';
type ButtonPosition = 'left' | 'right';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  width?: number;
  paddingTop?: number;
  fontSize?: number;
  disabled?: boolean;
  variant?: ButtonVariant;
  position?: ButtonPosition;
  errorMessage?: string;
}

const Button = ({
  children,
  onClick,
  width,
  paddingTop,
  fontSize,
  disabled = false,
  variant = 'filled',
  position = 'left',
  errorMessage = '',
}: ButtonProps) => {
  return (
    <ButtonWrapper
      paddingTop={paddingTop}
      position={position}
      variant={variant}
    >
      <StyledButton
        style={width ? { width: `${width}px` } : {}}
        onClick={onClick}
        disabled={disabled}
        variant={variant}
        fontSize={fontSize}
      >
        {children}
        {errorMessage && (
          <ErrorMessage variant={variant}>{errorMessage}</ErrorMessage>
        )}
      </StyledButton>
    </ButtonWrapper>
  );
};

export default Button;
