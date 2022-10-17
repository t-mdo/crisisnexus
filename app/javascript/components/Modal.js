import { Dialog } from '@headlessui/react';

export const Modal = ({ children, ...props }) => {
  return (
    <Dialog {...props}>
      <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {children}
      </div>
    </Dialog>
  );
};

export const ModalPanel = ({ children }) => (
  <Dialog.Panel className="mx-auto max-w-sm py-4 px-8 rounded bg-white modal-container shadow-lg z-50 overflow-y-auto">
    {children}
  </Dialog.Panel>
);

export const ModalTitle = ({ children }) => (
  <Dialog.Title className="mb-4 text-2xl text-gray-900 font-semibold">
    {children}
  </Dialog.Title>
);

export const ModalDescription = ({ children }) => (
  <Dialog.Description className="text-gray-600">{children}</Dialog.Description>
);

export default { Modal, ModalPanel, ModalTitle, ModalDescription };
