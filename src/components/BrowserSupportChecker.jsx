import { useEffect, useState } from 'react';

export function useIsChromeOnly() {
    const [isSupported, setIsSupported] = useState(null);

    useEffect(() => {
        let isChrome = false;

        if ('userAgentData' in navigator) {
            const brands = navigator.userAgentData.brands || [];
            isChrome = brands.some(
                (b) => b.brand === 'Google Chrome' || b.brand === 'Chromium'
            );
        } else {
            const userAgent = navigator.userAgent;
            isChrome =
                /Chrome/.test(userAgent) &&
                !/OPR/.test(userAgent) &&      // Opera
                !/Brave/.test(userAgent) &&
                !/SamsungBrowser/.test(userAgent) &&
                !/MSIE/.test(userAgent) &&   // IE 10 and older
                !/Trident/.test(userAgent);   // IE 11
        }

        setIsSupported(isChrome);
    }, []);


    return isSupported;
}
