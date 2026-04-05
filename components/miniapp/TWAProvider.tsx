'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { WebApp } from '@twa-dev/types';

interface TWAContextType {
  tg: WebApp | null;
  isReady: boolean;
}

const TWAContext = createContext<TWAContextType>({ tg: null, isReady: false });

export const TWAProvider = ({ children }: { children: React.ReactNode }) => {
  const [tg, setTg] = useState<WebApp | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Подгружаем SDK динамически
    const initTWA = async () => {
      const WebApp = (await import('@twa-dev/sdk')).default;
      setTg(WebApp);
      WebApp.ready();
      WebApp.expand();
      setIsReady(true);
      
      // Настройка цветов (фиксируем Zolotov Dark Luxe)
      WebApp.setHeaderColor('#000000');
      WebApp.setBackgroundColor('#000000');
    };

    initTWA();
  }, []);

  return (
    <TWAContext.Provider value={{ tg, isReady }}>
      {children}
    </TWAContext.Provider>
  );
};

export const useTWA = () => useContext(TWAContext);
