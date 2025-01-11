import { useState, useEffect } from 'react';

type Breakpoints = {
  largeDesktop: number;
  desktop: number;
  tablet: number;
  mobile: number;
};

const defaultBreakpoints: Breakpoints = {
  largeDesktop: 1440,
  desktop: 1024,
  tablet: 768,
  mobile: 576,
};

const useResponsiveSize = (breakpoints: Breakpoints = defaultBreakpoints) => {
  const [width, setWidth] = useState(window.innerWidth);

  const isMobile = width < breakpoints.tablet;
  const isTablet = width >= breakpoints.tablet && width < breakpoints.desktop;
  const isDesktop = width >= breakpoints.desktop && width < breakpoints.largeDesktop;
  const isLargeDesktop = width >= breakpoints.largeDesktop;

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    width,
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
  };
};

export default useResponsiveSize;
