import { useState } from 'react';
import type { ModalProps } from '~/components/Modal';

export function useModal() {
  const [modalConfig, setModalConfig] = useState<Omit<ModalProps, 'onClose' | 'isOpen'> & { isOpen: boolean; resolve: (val: any) => void } | null>(null);

  const showModal = (config: Omit<ModalProps, 'onClose' | 'isOpen'>) => {
    return new Promise((resolve) => {
      setModalConfig({ ...config, isOpen: true, resolve });
    });
  };

  const handleClose = (result: string | boolean | null) => {
    if (modalConfig) {
      modalConfig.resolve(result);
      setModalConfig(null);
    }
  };

  return { 
    modalConfig,
    showModal, 
    handleClose 
  };
}
