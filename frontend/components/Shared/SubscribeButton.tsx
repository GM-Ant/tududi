import React, { useState } from 'react';

const SubscribeButton: React.FC = () => {
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = async () => {
        if (!('Notification' in window) || !('serviceWorker' in navigator)) {
            alert('Push not supported');
            return;
        }
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') return;
        const registration = await navigator.serviceWorker.ready;
        try {
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
            });
            await fetch('/api/push/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(subscription),
            }).catch(() => {});
            setSubscribed(true);
        } catch (e) {
            console.error('Subscribe failed', e);
        }
    };

    return (
        <button
            onClick={handleSubscribe}
            disabled={subscribed}
            className="px-2 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition"
        >
            {subscribed ? 'Subscribed' : 'Subscribe'}
        </button>
    );
};

export default SubscribeButton;
