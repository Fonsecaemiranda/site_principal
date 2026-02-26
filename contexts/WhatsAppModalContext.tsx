
import React, { createContext, useContext, useState } from 'react';

interface WhatsAppModalContextType {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const WhatsAppModalContext = createContext<WhatsAppModalContextType>({
    isOpen: false,
    open: () => { },
    close: () => { },
});

export const useWhatsAppModal = () => useContext(WhatsAppModalContext);

export const WhatsAppModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <WhatsAppModalContext.Provider value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}>
            {children}
        </WhatsAppModalContext.Provider>
    );
};
