import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconPosition } from './Input.types';

const getBorderColor = (errorMessage: string | undefined, theme: Theme) =>
  errorMessage ? theme.colors.red : theme.colors.white;

export const InputContainer = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  width: '100%',
}));

export const Label = styled.label(({ theme }) => ({
  fontSize: '16px',
  fontWeight: '600',
  letterSpacing: '1px',
  color: theme.colors.white,
}));

export const InputWrapper = styled.div<{ errorMessage?: string }>(
  ({ theme, errorMessage }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    background: theme.colors.white,
    border: `2px solid ${getBorderColor(errorMessage, theme)}`,
    borderRadius: '15px',
    padding: `0 ${theme.spacing(6)} 0 ${theme.spacing(3)}`,
    transition: 'border-color 0.2s ease-in-out',

    '&:focus-within': {
      outline: 'none',
      borderColor: errorMessage ? theme.colors.red : theme.colors.green,
    },
  })
);

export const StyledInput = styled.input<{
  iconposition: IconPosition;
  icon?: IconDefinition;
}>`
  width: 100%;
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

  padding: ${({ icon, iconposition }) =>
    icon ? (iconposition === 'start' ? '0 0 0 30px' : '0 30px 0 0') : '0'};
`;

export const ResetInputIcon = styled(FontAwesomeIcon)<{
  iconposition?: IconPosition;
}>`
  ${({ theme, iconposition }) => css`
    position: absolute;
    right: ${iconposition === 'end' ? theme.spacing(6) : theme.spacing(2)};
    cursor: pointer;
    color: ${theme.colors.black};
    border-radius: 50%;
    padding: 4px;
    width: ${theme.spacing(2)};
    height: ${theme.spacing(2)};
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: ${theme.colors.lightGrey};
    }
  `}
`;

export const IconWrapper = styled.div<{ iconPosition: IconPosition }>`
  ${({ theme, iconPosition }) => css`
    ${theme.mixins.flexCenter};
    width: ${theme.spacing(2)};
    height: ${theme.spacing(2)};
    position: absolute;
    cursor: pointer;
    color: ${theme.colors.black};
    ${iconPosition === 'end' ? 'right' : 'left'}: ${theme.spacing(2)};
  `}
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.red};
  font-size: 14px;
`;
