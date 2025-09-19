'use client';

import React from 'react';
import { CartProvider } from '@/contexts/CartContext';

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}


