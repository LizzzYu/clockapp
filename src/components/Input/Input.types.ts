import { InputHTMLAttributes } from 'react';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
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

export type IconPosition = 'start' | 'end';
