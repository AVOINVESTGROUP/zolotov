'use client';

import React, { useState } from 'react';
import { MiniAppHeader } from './MiniAppHeader';
import { MiniAppMenu } from './MiniAppMenu';

export const MiniAppNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <MiniAppHeader onMenuClick={() => setIsMenuOpen(true)} />
      <MiniAppMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};
