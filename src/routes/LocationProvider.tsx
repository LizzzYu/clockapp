import { AnimatePresence } from 'framer-motion';
import React from 'react';

const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  return <AnimatePresence>{children}</AnimatePresence>;
};

export default LocationProvider;
