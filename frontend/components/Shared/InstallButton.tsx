import React, { useEffect, useState } from 'react';

const InstallButton: React.FC = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handler = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setVisible(true);
        };
        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        setVisible(false);
        setDeferredPrompt(null);
    };

    if (!visible) return null;

    return (
        <button
            onClick={handleInstall}
            className="px-2 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition"
        >
            Install
        </button>
    );
};

export default InstallButton;
