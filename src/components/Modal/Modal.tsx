import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Breakpoints } from '../../constants/breakpoints.enum';

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
    min-width: 450px;
    min-height: 400px;
    padding: 40px;
  }

  ${({ theme }) => theme.mediaQuery(Breakpoints.UltraWide)} {
    min-width: 600px;
    min-height: 500px;
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

const CloseIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.secondaryBlack};

  &:hover {
    color: ${({ theme }) => theme.colors.darkGrey};
  }
`;

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

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      const timeout = setTimeout(() => setIsAnimating(false), 250);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

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
