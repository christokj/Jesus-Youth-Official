import { useEffect, useState } from 'react';

export function useIsChromeOnly() {
    const [isChrome, setIsChrome] = useState(null);

    useEffect(() => {
        const ua = navigator.userAgent;

        // Check for Chrome (including mobile Chrome 'CriOS')
        const isChromium = ua.includes('Chrome') || ua.includes('CriOS');
        const isOpera = ua.includes('OPR') || ua.includes('Opera');
        const isEdge = ua.includes('Edg');
        const isSamsung = ua.includes('SamsungBrowser');
        const isFirefox = ua.includes('Firefox');
        const isBrave = ua.includes('Brave');
        const isSafari = ua.includes('Safari') && !ua.includes('Chrome'); // Safari usually shows up with "Safari" but not "Chrome"
        const isIOS = /iPhone|iPad|iPod/.test(ua);

        const isRealChrome =
            isChromium &&
            !isOpera &&
            !isEdge &&
            !isSamsung &&
            !isFirefox &&
            !isBrave &&
            (!isIOS || ua.includes('CriOS')); // Allow Chrome on iOS if it shows CriOS

        setIsChrome(isRealChrome);
    }, []);

    return isChrome;
}
