import React, { useEffect, useRef, useState } from 'react';

// Google's official "Sign in with Google" button (Google Identity Services).
// Google renders the button itself; when the user picks an account we get an
// ID token ("credential") that the backend verifies at /api/auth/google.
// https://developers.google.com/identity/gsi/web/guides/display-button
//
// Hardcoded directly (OAuth client IDs are public by design — every Google
// sign-in request already sends this to the browser) rather than read from
// VITE_GOOGLE_CLIENT_ID, so a build on the VPS never depends on a .env file
// being present. Must match GOOGLE_CLIENT_ID in backend/.env.

export const GOOGLE_CLIENT_ID = '95355527115-90pbfhmjirgm5qgvpqe6k7k8fm0qntkc.apps.googleusercontent.com';

const SCRIPT_SRC = 'https://accounts.google.com/gsi/client';
let scriptPromise = null;

const loadGoogleScript = () => {
    if (window.google?.accounts?.id) return Promise.resolve();
    if (!scriptPromise) {
        scriptPromise = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = SCRIPT_SRC;
            script.async = true;
            script.defer = true;
            script.onload = resolve;
            script.onerror = () => {
                scriptPromise = null;
                reject(new Error('Could not load Google sign-in'));
            };
            document.head.appendChild(script);
        });
    }
    return scriptPromise;
};

/**
 * Props:
 *  - onCredential(credential): async; called with Google's ID token
 *  - text: 'signin_with' | 'signup_with' | 'continue_with'
 */
const GoogleSignInButton = ({ onCredential, text = 'continue_with' }) => {
    const containerRef = useRef(null);
    const callbackRef = useRef(onCredential);
    const [status, setStatus] = useState('loading'); // loading | ready | busy | error
    callbackRef.current = onCredential;

    useEffect(() => {
        if (!GOOGLE_CLIENT_ID) return undefined;
        let cancelled = false;
        let resizeTimer = null;
        let lastWidth = 0;

        const render = () => {
            const el = containerRef.current;
            if (!el || !window.google?.accounts?.id) return;
            const width = Math.min(400, Math.max(200, Math.floor(el.parentElement?.clientWidth || 320)));
            lastWidth = width;
            window.google.accounts.id.initialize({
                client_id: GOOGLE_CLIENT_ID,
                callback: async ({ credential }) => {
                    setStatus('busy');
                    try {
                        await callbackRef.current?.(credential);
                    } finally {
                        if (!cancelled) setStatus('ready');
                    }
                },
                ux_mode: 'popup',
                cancel_on_tap_outside: true,
            });
            el.innerHTML = '';
            window.google.accounts.id.renderButton(el, {
                type: 'standard',
                theme: 'outline',
                size: 'large',
                shape: 'pill',
                text,
                logo_alignment: 'center',
                // Google caps the button at 400px; fit it to the form.
                width,
            });
            setStatus('ready');
        };

        // Re-fit the button if the viewport is resized or the device is
        // rotated — Google only sizes it once at render time otherwise.
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const el = containerRef.current;
                if (!el) return;
                const width = Math.min(400, Math.max(200, Math.floor(el.parentElement?.clientWidth || 320)));
                if (Math.abs(width - lastWidth) >= 8) render();
            }, 150);
        };

        loadGoogleScript()
            .then(() => {
                if (cancelled) return;
                render();
                window.addEventListener('resize', handleResize);
            })
            .catch(() => !cancelled && setStatus('error'));

        return () => {
            cancelled = true;
            clearTimeout(resizeTimer);
            window.removeEventListener('resize', handleResize);
        };
    }, [text]);

    if (!GOOGLE_CLIENT_ID) return null;

    return (
        <div>
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center">
                    <span className="bg-transparent px-4 text-white/60 font-semibold">or continue with</span>
                </div>
            </div>
            <div className={`flex justify-center min-h-[44px] transition-opacity ${status === 'busy' ? 'opacity-50 pointer-events-none' : ''}`}>
                <div ref={containerRef} />
            </div>
            {status === 'busy' && <p className="mt-2 text-center text-sm text-white/70">Signing you in…</p>}
            {status === 'error' && (
                <p className="mt-2 text-center text-sm text-white/70">
                    Google sign-in couldn't load. Check your connection or use email and password.
                </p>
            )}
        </div>
    );
};

export default GoogleSignInButton;
