import React from 'react';
import usePortal from './helper/hooks/usePortal';
import { createPortal } from 'react-dom';

const ModalPortal = ({ children }: { children: React.ReactNode }) => {
  const elementDiv = usePortal('portal-root');

  return elementDiv ? createPortal(children, elementDiv) : null;
};

export default ModalPortal;
