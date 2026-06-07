import React, { useState } from 'react';
import '~/styles/components/Modal.scss';

export interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  type: 'alert' | 'confirm' | 'prompt';
  defaultValue?: string;
  onClose: (result: string | boolean | null) => void;
}

export function Modal({ isOpen, title, message, type, defaultValue = '', onClose }: ModalProps) {
  const [inputValue, setInputValue] = useState(defaultValue);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-content__title">{title}</h2>
        <p className="modal-content__message">{message}</p>
        
        {type === 'prompt' && (
          <input 
            type="text" 
            className="modal-content__input"
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)}
            autoFocus
          />
        )}

        <div className="modal-content__actions">
          {(type === 'confirm' || type === 'prompt') && (
            <button 
              className="modal-content__button modal-content__button--secondary" 
              onClick={() => onClose(null)}
            >
              Скасувати
            </button>
          )}
          <button 
            className="modal-content__button modal-content__button--primary" 
            onClick={() => {
              if (type === 'prompt') onClose(inputValue);
              else if (type === 'confirm') onClose(true);
              else onClose(true);
            }}
          >
            ОК
          </button>
        </div>
      </div>
    </div>
  );
}
