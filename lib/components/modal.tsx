import { FC, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { createPortal } from "react-dom";
import React from "react";

import { useBodyScrollLock, useClickOutside, useKeyPress } from "../hooks";
import { cx } from "class-variance-authority";

type Props = {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  showCloseButton?: boolean;
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
};

const Modal: ({
  isOpen,
  children,
  onClose,
  showCloseButton,
}: Props) => React.ReactPortal = ({
  isOpen,
  children,
  onClose,
  showCloseButton,
}) => {
  const clickOutside = useClickOutside(onClose);
  useBodyScrollLock(isOpen);
  useKeyPress("Escape", onClose);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-modal-overlay z-10"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            ref={clickOutside}
            className="bg-modal-background p-4 rounded-lg max-w-[600px]"
            variants={modalVariants}
          >
            {showCloseButton && (
              <XMarkIcon
                className="w-5 h-5 ml-auto text-modal-closeIcon cursor-pointer"
                onClick={onClose}
              />
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

type SCProps = { children: ReactNode; className?: string };

const Header: FC<SCProps> = ({ children, className }) => (
  <div className={cx(["border-b border-modal-border mb-4 pb-2", className])}>
    {children}
  </div>
);
const Body: FC<SCProps> = ({ children, className }) => (
  <div className={cx(["overflow-y-auto max-h-[70vh]", className])}>
    {children}
  </div>
);
const Footer: FC<SCProps> = ({ children, className }) => (
  <div className={cx(["border-t border-modal-border mt-4 pt-2", className])}>
    {children}
  </div>
);

Modal.Header = Header;
Modal.Header.displayName = "Header";

Modal.Body = Body;
Modal.Body.displayName = "Body";

Modal.Footer = Footer;
Modal.Footer.displayName = "Footer";

export default Modal;
