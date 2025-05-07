import { useEffect, useState } from 'react';

export function useIsChromeOnly() {
    const [isSupported, setIsSupported] = useState(null);

    useEffect(() => {
        const userAgent = navigator.userAgent;
        const vendor = navigator.vendor;

        const isChrome =
            /Chrome/.test(userAgent) &&
            /Google Inc/.test(vendor) &&
            !/OPR/.test(userAgent) &&          // Opera
            !/Brave/.test(userAgent) &&        // Brave
            !/SamsungBrowser/.test(userAgent) &&
            !/UCBrowser/.test(userAgent) &&
            !/Android/.test(userAgent) &&
            !/MSIE/.test(userAgent) &&         // IE 10 and older
            !/Trident/.test(userAgent);        // IE 11

        setIsSupported(isChrome);
    }, []);

    return isSupported;
}
