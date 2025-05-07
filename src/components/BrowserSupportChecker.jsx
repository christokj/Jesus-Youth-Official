import { useEffect, useState } from 'react';

export function useIsChromeOnly() {
    const [isSupported, setIsSupported] = useState(null);

    useEffect(() => {
        const ua = navigator.userAgent || '';
        const isChromium = ua.includes('Chrome') || ua.includes('CriOS'); // Chrome on iOS
        // const isOpera = ua.includes('OPR') || ua.includes('Opera');
        // const isEdge = ua.includes('Edg');
        const isSamsung = ua.includes('SamsungBrowser');
        const isFirefox = ua.includes('Firefox');
        const isBrave = ua.includes('Brave');
        const isIOSChrome = ua.includes('CriOS') && ua.includes('Mobile');

        const isChrome = isChromium && !isSamsung && !isFirefox && !isBrave;

        setIsSupported(isChrome || isIOSChrome);
    }, []);

    return isSupported;
}
