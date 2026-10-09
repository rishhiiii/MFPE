const jwt = require('jsonwebtoken');

// Verifies the ID token ("credential") that Google's "Sign in with Google"
// button gives the browser. It's an RS256 JWT signed by Google; we check the
// signature against Google's published certificates, plus the audience (our
// OAuth Client ID), issuer and expiry. No extra SDK needed.
// https://developers.google.com/identity/gsi/web/guides/verify-google-id-token

const CERTS_URL = 'https://www.googleapis.com/oauth2/v1/certs';
const ISSUERS = ['accounts.google.com', 'https://accounts.google.com'];

let certCache = { certs: null, expiresAt: 0 };

const getCerts = async (forceRefresh = false) => {
    if (!forceRefresh && certCache.certs && Date.now() < certCache.expiresAt) return certCache.certs;
    const res = await fetch(CERTS_URL);
    if (!res.ok) throw new Error(`Could not fetch Google certificates (HTTP ${res.status})`);
    const maxAge = Number(/max-age=(\d+)/.exec(res.headers.get('cache-control') || '')?.[1]) || 3600;
    certCache = { certs: await res.json(), expiresAt: Date.now() + maxAge * 1000 };
    return certCache.certs;
};

// Returns the verified token payload (email, name, picture, ...), or throws.
const verifyGoogleIdToken = async (idToken) => {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (!clientId) throw new Error('GOOGLE_CLIENT_ID is not set');

    const decoded = jwt.decode(idToken, { complete: true });
    if (!decoded?.header?.kid) throw new Error('Malformed token');

    let cert = (await getCerts())[decoded.header.kid];
    if (!cert) cert = (await getCerts(true))[decoded.header.kid]; // Google rotated its keys
    if (!cert) throw new Error('Unknown signing key');

    const payload = jwt.verify(idToken, cert, {
        algorithms: ['RS256'],
        audience: clientId,
        issuer: ISSUERS,
    });
    if (!payload.sub) throw new Error('Token has no subject');
    return payload;
};

module.exports = { verifyGoogleIdToken };
