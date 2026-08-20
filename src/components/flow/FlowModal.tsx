import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Framer-free modal shell for the intake flow.
 *
 * Same markup, classes and behavior as the legacy `src/components/ui/Modal.tsx`
 * (body scroll lock, backdrop click closes, optional header/close button), but
 * the enter animation is plain CSS (see flow.css) so the FlowIsland bundle does
 * not ship framer-motion. The legacy ui/Modal becomes dead code once nothing
 * else imports it (A4 cleanup).
 */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  hideCloseButton?: boolean;
}

const FlowModal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, hideCloseButton = false }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        onClick={onClose}
        className="flow-modal-backdrop fixed inset-0 bg-black/50 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        className="flow-modal-panel relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            {!hideCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}
        {!title && !hideCloseButton && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors bg-white/50 backdrop-blur-sm"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Content Area */}
        <div className="overflow-y-auto flex-1 p-6 custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FlowModal;
