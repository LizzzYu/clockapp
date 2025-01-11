import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const LoaderWrapper = styled(motion.div)`
  ${({ theme }) => theme.mixins.flexCenter}
  height: 100vh;
  width: 100%;
`;

const Loader = styled.div<{ color?: string }>`
  width: 60px;
  aspect-ratio: 1;
  display: grid;
  grid: 50%/50%;
  color: ${({ color }) => color ?? '#ffa516'};
  border-radius: 50%;
  --_g: no-repeat linear-gradient(currentColor 0 0);
  background: var(--_g), var(--_g), var(--_g);
  background-size: 50.1% 50.1%;
  animation: l9-0 1.5s infinite steps(1) alternate,
    l9-0-0 3s infinite steps(1) alternate;

  &::before {
    content: '';
    background: ${({ theme }) => theme.colors.leaderYellow};
    border-top-left-radius: 100px;
    transform: perspective(150px) rotateY(0deg) rotateX(0deg);
    transform-origin: bottom right;
    animation: l9-1 1.5s infinite linear alternate;
  }

  @keyframes l9-0 {
    0% {
      background-position: 0 100%, 100% 100%, 100% 0;
    }
    33% {
      background-position: 100% 100%, 100% 100%, 100% 0;
    }
    66% {
      background-position: 100% 0, 100% 0, 100% 0;
    }
  }
  @keyframes l9-0-0 {
    0% {
      transform: scaleX(1) rotate(0deg);
    }
    50% {
      transform: scaleX(-1) rotate(-90deg);
    }
  }
  @keyframes l9-1 {
    16.5% {
      transform: perspective(150px) rotateX(-90deg) rotateY(0deg) rotateX(0deg);
      filter: grayscale(0.8);
    }
    33% {
      transform: perspective(150px) rotateX(-180deg) rotateY(0deg) rotateX(0deg);
    }
    66% {
      transform: perspective(150px) rotateX(-180deg) rotateY(-180deg)
        rotateX(0deg);
    }
    100% {
      transform: perspective(150px) rotateX(-180deg) rotateY(-180deg)
        rotateX(-180deg);
      filter: grayscale(0.8);
    }
  }
`;

interface LoadindProps {
  color?: string;
}

const Loading = ({ color }: LoadindProps) => {
  const theme = useTheme();

  return (
    <LoaderWrapper
      key='loading-component'
      variants={theme.defaultMotionAnimation}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={{ duration: 0.5 }}
    >
      <Loader color={color} />
    </LoaderWrapper>
  );
};

export default Loading;
