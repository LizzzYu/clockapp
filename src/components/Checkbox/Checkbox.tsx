import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const CheckboxWrapper = styled.div<{ paddingTop: number | undefined }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: ${({ paddingTop }) => `${paddingTop}px`};
`;

const StyledCheckboxContainer = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background-color: transparent;
  cursor: pointer;
`;

const StyledCheckbox = styled.input`
  appearance: none;
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  cursor: pointer;
  opacity: 0;
  z-index: 1;
`;

const CheckIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  color: ${({ theme }) => theme.colors.lightGreen};
  visibility: hidden;
`;

const StyledCheckboxContainerChecked = styled(StyledCheckboxContainer)`
  background-color: ${({ theme }) => theme.colors.white};
  border-color: ${({ theme }) => theme.colors.white};

  ${CheckIcon} {
    visibility: visible;
  }
`;

const Label = styled.label`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  font-weight: 500;
`;

interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  paddingTop?: number;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked = true,
  onChange,
  paddingTop,
}) => {
  return (
    <CheckboxWrapper paddingTop={paddingTop}>
      <StyledCheckboxContainerChecked>
        <StyledCheckbox type='checkbox' checked={checked} onChange={onChange} />
        {checked && <CheckIcon icon={faCheck} />}
      </StyledCheckboxContainerChecked>

      <Label htmlFor={`checkbox-${label}`}>{label}</Label>
    </CheckboxWrapper>
  );
};

export default Checkbox;
