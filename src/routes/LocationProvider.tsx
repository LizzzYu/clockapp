import { AnimatePresence } from 'framer-motion';
import React from 'react';

const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AnimatePresence mode='wait'>
      {/* The key here ensures animations are triggered on route changes */}
      {React.cloneElement(children as React.ReactElement, {
        key: location.pathname,
      })}
    </AnimatePresence>
  );
};

export default LocationProvider;
