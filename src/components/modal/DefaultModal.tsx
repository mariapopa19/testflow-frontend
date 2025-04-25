import { Modal } from '../ui/modal';
import { ReactNode } from 'react';

interface DefaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

const DefaultModal: React.FC<DefaultModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = 'max-w-[600px] p-5 lg:p-10',
}) => {
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} className={className}>
        <h4 className="font-semibold text-gray-800 mb-4 text-title-sm dark:text-white/90">
          {title}
        </h4>
        {children}
      </Modal>
    </div>
  );
};

export default DefaultModal;
