'use client';

import { useEffect } from 'react';
import { captureConsole, initializeLogs } from '@/lib/logger';

export function LoggerInit(): null {
  useEffect(() => {
    void initializeLogs();
    captureConsole();

    console.log('📝 Sistema de logs inicializado');
  }, []);

  return null;
}
