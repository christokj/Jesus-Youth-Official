import { useEffect, useState } from 'react';

export function useIsChromeOnly() {
    const [isChrome, setIsChrome] = useState(null);

    useEffect(() => {
        const ua = navigator.userAgent;

        // Use userAgentData if available (modern browsers)
        if (navigator.userAgentData && navigator.userAgentData.brands) {
            const brands = navigator.userAgentData.brands.map((b) => b.brand);
            const isRealChrome =
                brands.includes('Google Chrome') || brands.includes('Chromium');
            setIsChrome(isRealChrome);
            return;
        }

        // Fallback for older browsers
        const isChromium = ua.includes('Chrome') || ua.includes('CriOS');
        const isIOS = /iPhone|iPad|iPod/.test(ua);
        const isSamsung = ua.includes('SamsungBrowser');
        const isBrave = ua.includes('Brave');
        const isOpera = ua.includes('OPR') || ua.includes('Opera');
        const isEdge = ua.includes('Edg');
        const isFirefox = ua.includes('Firefox');
        const isGenericMobile = ua.includes('Mobile Safari') && !ua.includes('CriOS');

        const isRealChrome =
            isChromium &&
            !isSamsung &&
            !isBrave &&
            !isOpera &&
            !isEdge &&
            !isFirefox &&
            (!isIOS || ua.includes('CriOS')) &&
            !isGenericMobile;

        setIsChrome(isRealChrome);
    }, []);

    return isChrome;
}
