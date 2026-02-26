
import React, { useState, useEffect } from 'react';
import { useWhatsAppModal } from '../contexts/WhatsAppModalContext';
import { trackUTMEvent } from '../utils/utm';

const WHATSAPP_NUMBER = '5592982926890';
const MAX_INPUT_LENGTH = 500;

// Sanitiza input do usuário removendo caracteres perigosos
function sanitizeInput(input: string, maxLen = MAX_INPUT_LENGTH): string {
    return input
        .replace(/[<>{}]/g, '')        // Remove caracteres HTML/template
        .replace(/javascript:/gi, '')   // Remove javascript: protocol
        .replace(/on\w+=/gi, '')        // Remove event handlers
        .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '') // Remove control chars
        .slice(0, maxLen)
        .trim();
}

const areas = [
    'Direito Previdenciário',
    'Direito Bancário',
    'Direito do Consumidor',
    'Outro assunto',
];

const WhatsAppModal: React.FC = () => {
    const { isOpen, close } = useWhatsAppModal();
    const [name, setName] = useState('');
    const [area, setArea] = useState('');
    const [message, setMessage] = useState('');
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Rastrear abertura do modal
            trackUTMEvent('whatsapp_modal_open');
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            close();
        }, 250);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const safeName = sanitizeInput(name);
        const safeArea = sanitizeInput(area, 100);
        const safeMessage = sanitizeInput(message);

        if (!safeName || !safeArea) return;

        // Rastrear submit com dados sanitizados
        trackUTMEvent('whatsapp_form_submit', {
            name: safeName,
            area: safeArea,
            has_message: safeMessage ? 'true' : 'false',
        });

        const now = new Date();
        const dateStr = now.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        // Mensagem WhatsApp — sem dados UTM
        const parts = [
            `📋 *Novo contato via site*`,
            `> Nome: ${safeName}`,
            `> Interesse em: ${safeArea}`,
        ];
        if (safeMessage) {
            parts.push(`> Mensagem: ${safeMessage}`);
        }
        parts.push(`> Quando: ${dateStr} - ${timeStr}`);

        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(parts.join('\n'))}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

        setName('');
        setArea('');
        setMessage('');
        handleClose();
    };

    if (!isOpen && !isClosing) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center px-4 transition-all duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
            onClick={handleClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

            {/* Modal */}
            <div
                className={`relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-[#0d1023] p-6 pb-8 relative">
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center mb-4">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                    </div>
                    <h2 className="text-white text-2xl font-semibold tracking-tight">Fale com um Especialista</h2>
                    <p className="text-gray-400 text-sm mt-2 leading-relaxed">Preencha seus dados e você será redirecionado para o WhatsApp.</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Nome */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Nome *</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Seu nome completo"
                            required
                            className="w-full px-4 py-3.5 bg-[#f9f5f1] border border-gray-200 rounded-xl text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A7BFF]/30 focus:border-[#4A7BFF] transition-all"
                        />
                    </div>

                    {/* Área de Interesse */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Área de Interesse *</label>
                        <select
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                            required
                            className="w-full px-4 py-3.5 bg-[#f9f5f1] border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A7BFF]/30 focus:border-[#4A7BFF] transition-all appearance-none cursor-pointer"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%236b7280' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
                        >
                            <option value="" disabled>Selecione uma área</option>
                            {areas.map((a) => (
                                <option key={a} value={a}>{a}</option>
                            ))}
                        </select>
                    </div>

                    {/* Mensagem */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                            Mensagem <span className="text-gray-300 font-normal normal-case">(opcional)</span>
                        </label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Descreva brevemente sua situação..."
                            rows={3}
                            className="w-full px-4 py-3.5 bg-[#f9f5f1] border border-gray-200 rounded-xl text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A7BFF]/30 focus:border-[#4A7BFF] transition-all resize-none"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full group flex items-center justify-center gap-3 bg-green-500 text-white py-4 rounded-xl font-semibold text-base hover:bg-green-600 transition-all shadow-lg shadow-green-500/20 hover:shadow-green-500/30"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Iniciar Conversa
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300">
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </button>

                    <p className="text-center text-xs text-gray-400 leading-relaxed">
                        Seus dados são utilizados apenas para o primeiro contato.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default WhatsAppModal;
