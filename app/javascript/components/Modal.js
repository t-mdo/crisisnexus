import classnames from 'classnames';
import { Dialog } from '@headlessui/react';
import XIcon from 'icons/regular/xmark.svg';

export const Modal = ({ children, onClose = () => {}, ...props }) => {
  return (
    <Dialog onClose={onClose} {...props}>
      <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {children}
      </div>
    </Dialog>
  );
};

export const ModalPanel = ({ children, className, size = 'medium' }) => (
  <Dialog.Panel
    className={classnames(
      'flex flex-col mx-auto py-4 px-8 rounded bg-white modal-container shadow-lg z-50 overflow-y-auto',
      {
        'max-w-sm md:max-w-1xl': size === 'small',
        'max-w-sm md:max-w-2xl': size === 'medium',
        'max-w-xl sm:max-w-4xl': size === 'large',
      },
      className,
    )}
  >
    {children}
  </Dialog.Panel>
);

export const ModalTitle = ({ children, onClose, className }) => (
  <Dialog.Title
    className={classnames(
      'mb-10 text-2xl text-gray-900 font-semibold',
      className,
    )}
  >
    <div className="flex justify-between items-center">
      {children}
      {onClose && (
        <button tabIndex={-1} onClick={onClose}>
          <XIcon className="w-4 fill-gray-600" />
        </button>
      )}
    </div>
  </Dialog.Title>
);

export const ModalDescription = ({ children, className }) => (
  <Dialog.Description
    as="div"
    className={classnames('text-gray-600', className)}
  >
    {children}
  </Dialog.Description>
);

export default { Modal, ModalPanel, ModalTitle, ModalDescription };
