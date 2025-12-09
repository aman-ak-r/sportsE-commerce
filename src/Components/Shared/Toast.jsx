import React, { useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimesCircle, FaTimes } from 'react-icons/fa';
import './Toast.css';

const Toast = ({ id, message, type = 'info', onClose }) => {
    const icons = {
        success: <FaCheckCircle />,
        error: <FaTimesCircle />,
        warning: <FaExclamationCircle />,
        info: <FaInfoCircle />
    };

    return (
        <div className={`toast toast-${type} scale-in`}>
            <div className="toast-icon">
                {icons[type]}
            </div>
            <div className="toast-message">
                {message}
            </div>
            <button className="toast-close" onClick={() => onClose(id)} aria-label="Close">
                <FaTimes />
            </button>
        </div>
    );
};

export default Toast;
