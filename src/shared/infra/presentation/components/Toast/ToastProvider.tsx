'use client';

import React from 'react';
import Toast from './Toast';

const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // O Toast já é renderizado em um portal, então só precisamos
  // garantir que ele seja incluído junto com os filhos
  return (
    <>
      {children}
      <Toast />
    </>
  );
};

export default ToastProvider; 