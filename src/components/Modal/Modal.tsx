import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Breakpoints } from '../../constants/breakpoints.enum';

// Overlay styles for the modal background
const Overlay = styled.div<{ isClosing: boolean }>`
  ${({ theme }) => theme.mixins.flexCenter}
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  z-index: 1000;

  animation: ${({ isClosing }) => (isClosing ? 'fadeOut' : 'fadeIn')} 0.3s
    ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

// Modal container styles for the content
const ModalContainer = styled.div<{ isClosing: boolean }>`
  display: flex;
  position: relative;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  border-radius: 10px;
  padding: 20px;
  min-width: 200px;
  max-width: 90vw;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);

  animation: ${({ isClosing }) => (isClosing ? 'scaleDown' : 'scaleUp')} 0.3s
    ease-out;

  ${({ theme }) => theme.mediaQuery(Breakpoints.Desktop)} {
    min-width: 200px;
    min-height: 200px;
    padding: 40px;
  }

  ${({ theme }) => theme.mediaQuery(Breakpoints.UltraWide)} {
    min-width: 300px;
    min-height: 300px;
  }

  @keyframes scaleUp {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes scaleDown {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.8);
    }
  }
`;

// Close button styles
const CloseIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 20px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.secondaryBlack};

  &:hover {
    color: ${({ theme }) => theme.colors.darkGrey};
  }
`;

// Content wrapper styles for modal children
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle the visibility and closing animation of the modal
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      const timeout = setTimeout(() => setIsAnimating(false), 250); // Wait for the closing animation
      return () => clearTimeout(timeout); // Clean up timeout when modal reopens
    }
  }, [isOpen]);

  // Add support for closing the modal with the Escape key
  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  // Handle overlay click to close the modal
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  // Prevent rendering if the modal is not visible
  if (!isOpen && !isAnimating) return null;

  return (
    <Overlay isClosing={!isOpen} onClick={handleOverlayClick}>
      <ModalContainer isClosing={!isOpen}>
        <CloseIcon icon={faTimes} onClick={onClose} />
        <ContentWrapper>{children}</ContentWrapper>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
