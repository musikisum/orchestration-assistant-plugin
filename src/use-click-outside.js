import { useEffect } from 'react';

export function useClickOutside(ref, saveOnOutsideClick) {
  useEffect(() => {
    const handler = event => {
      // if ref and click is outside
      if (ref.current && !ref.current.contains(event.target)) {
        saveOnOutsideClick();
      }
    };
    // register and cleanup
    document.addEventListener('pointerdown', handler, true);
    return () => document.removeEventListener('pointerdown', handler, true);
  }, [ref, saveOnOutsideClick]);
}