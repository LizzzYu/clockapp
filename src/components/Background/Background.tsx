import styled from '@emotion/styled';
import { Breakpoints } from '../../constants/breakpoints.enum';
import { css } from '@emotion/react';

const Background = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flexCenter}
    width: 100%;
    height: 100vh;
    background-color: #78be43;
    background-image: radial-gradient(
        circle,
        rgba(12, 138, 214, 0.2) 70%,
        rgba(12, 138, 214, 0.2) 70%,
        transparent 50%
      ),
      radial-gradient(
        circle,
        rgba(12, 138, 214, 0.2) 60%,
        rgba(12, 138, 214, 0.2) 60%,
        transparent 40%
      ),
      radial-gradient(
        circle,
        rgba(12, 138, 214, 0.2) 50%,
        rgba(12, 138, 214, 0.2) 50%,
        transparent 30%
      );
    background-repeat: no-repeat;
    background-position: -500px -250px, -420px -230px, -250px -150px;
    background-size: 1000px 1000px, 800px 800px, 500px 500px;
    position: relative;

    // Desktop styles
    ${theme.mediaQuery(Breakpoints.Desktop)} {
      background-position: -600px -300px, -550px -300px, -300px -200px;
      background-size: 1500px 1500px, 1200px 1200px, 700px 700px;
    }

    // LargeDesktop styles
    ${theme.mediaQuery(Breakpoints.LargeDesktop)} {
      background-position: -600px -400px, -500px -350px, -300px -250px;
      background-size: 1700px 1700px, 1300px 1300px, 800px 800px;
    }

    // UltraWide styles
    ${theme.mediaQuery(Breakpoints.UltraWide)} {
      background-position: -600px -450px, -500px -400px, -300px -300px;
      background-size: 2100px 2100px, 1600px 1600px, 1000px 1000px;
    }
  `}
`;

export default Background;
