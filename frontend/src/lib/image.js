// Cloudinary can transform an image on the fly via URL segments, so an
// uploaded product photo can be served as a compressed, correctly-sized
// WebP/AVIF without touching the stored URL or re-uploading anything.
// Non-Cloudinary URLs (local /uploads fallback, bundled assets) pass through
// untouched.
export const optimizeCloudinaryUrl = (url, width) => {
    if (!url || typeof url !== 'string') return url;
    if (!url.includes('res.cloudinary.com') || !url.includes('/upload/')) return url;
    const transform = width ? `f_auto,q_auto,w_${width}` : 'f_auto,q_auto';
    return url.replace('/upload/', `/upload/${transform}/`);
};
