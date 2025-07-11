import React, { useEffect, useState } from 'react';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsActive(false);
    setTimeout(onClose, 300);
  };

  if (!isOpen && !isActive) return null; // Не рендерим, если модальное окно полностью закрыто

  return (
    <div className={`modal-overlay ${isActive ? 'active' : ''}`} onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>
          <img src="/assets/close_icon.png" alt="Иконка закрытия модального окна" />
        </button>
        {children}
      </div>
    </div>
  );
};
