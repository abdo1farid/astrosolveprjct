import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ 
    isOpen, 
    onClose, 
    title, 
    children, 
    showCloseButton = true,
    size = 'default' // 'small', 'default', 'large'
}) => {
    const modalRef = useRef(null);

    // Handle ESC key and body scroll
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const sizeClasses = {
        small: 'max-w-md',
        default: 'max-w-2xl',
        large: 'max-w-4xl'
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-sm transition-opacity duration-300" />
            
            {/* Modal */}
            <div 
                ref={modalRef}
                className={`${sizeClasses[size]} w-full relative bg-slate-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-800/20 transform transition-all duration-300 animate-fade-in-up`}
            >
                {/* Background Effects */}
                    <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl" />
                </div>

                {/* Content Container */}
                <div className="relative">
                    {/* Header */}
                        {(title || showCloseButton) && (
                        <div className="flex items-center justify-between p-6 border-b border-slate-800/30">
                            {title && (
                                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-300">
                                    {title}
                                </h3>
                            )}
                            {showCloseButton && (
                                <button
                                    onClick={onClose}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg text-sky-300/70 hover:text-sky-300 hover:bg-sky-500/10 transition-colors"
                                    aria-label="Close modal"
                                >
                                    <span className="material-symbols-rounded">close</span>
                                </button>
                            )}
                        </div>
                    )}

                    {/* Body */}
                    <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.node,
    showCloseButton: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'default', 'large'])
};

export default Modal;
