// components/BrowserSupportChecker.jsx
import { useEffect, useState } from 'react';

export default function BrowserSupportChecker() {
    const [isSupported, setIsSupported] = useState(true);

    useEffect(() => {
        // Create test element
        const testElement = document.createElement('div');
        document.body.appendChild(testElement);

        // Test for critical Tailwind features
        const tests = {
            cssVariables: window.CSS && CSS.supports('color', 'var(--primary)'),
            grid: window.CSS && CSS.supports('display', 'grid'),
            flexbox: window.CSS && CSS.supports('display', 'flex'),
            transforms: window.CSS && CSS.supports('transform', 'translateX(0)'),
            focusVisible: window.CSS && CSS.supports('selector(:focus-visible)'),
        };

        // Check if all tests pass
        const allSupported = Object.values(tests).every(Boolean);
        setIsSupported(allSupported);

        // Clean up
        document.body.removeChild(testElement);

        if (!allSupported) {
            console.warn('Browser lacks support for required Tailwind features:', tests);
        }
    }, []);

    if (isSupported) return null;

    return (
        <div className="fixed inset-0 z-50 bg-gray-900 text-white p-8 flex items-center justify-center">
            <div className="max-w-2xl text-center">
                <h2 className="text-2xl font-bold mb-4">Browser Compatibility Issue</h2>
                <p className="mb-4">
                    Your browser doesn't fully support all the modern CSS features required by this website.
                    Some styling may appear broken or incorrect.
                </p>
                <p className="mb-6">
                    For the best experience, please update to the latest version of Chrome, Firefox, Edge, or Safari.
                </p>
                <button
                    onClick={() => setIsSupported(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                >
                    Continue Anyway
                </button>
            </div>
        </div>
    );
}