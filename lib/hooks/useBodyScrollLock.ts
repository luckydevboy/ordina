import { useEffect } from "react";

const useBodyScrollLock = (isOpen: boolean) => {
  useEffect(() => {
    // Save the current value of body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (isOpen) {
      // Prevent scrolling on mount
      document.body.style.overflow = "hidden";
    }

    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);
};

export default useBodyScrollLock;
