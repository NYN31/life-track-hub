import { useEffect, useMemo } from 'react';

const usePortal = (rootId: string): HTMLDivElement | null => {
  const elementDiv = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    let mountElement = document.getElementById(rootId);

    if (!mountElement) {
      mountElement = document.createElement('div');
      mountElement.setAttribute('id', rootId);
      document.body.appendChild(mountElement);
    }

    mountElement.appendChild(elementDiv);

    return () => {
      mountElement?.removeChild(elementDiv);

      if (mountElement && mountElement.childNodes.length === 0) {
        document.body.removeChild(mountElement);
      }
    };
  }, [elementDiv, rootId]);

  return elementDiv;
};

export default usePortal;
