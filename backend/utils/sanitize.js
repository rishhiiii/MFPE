// Strips HTML tags from user-submitted text (review comments, contact
// messages) before it's stored. Not currently exploitable as XSS — the
// frontend renders this text through React's default escaping, never
// dangerouslySetInnerHTML — but stripping tags at the point of storage is
// cheap defense-in-depth against any future consumer of this data that
// isn't as careful (an admin-panel redesign, an email digest, etc.).
const stripHtml = (str) => String(str ?? '').replace(/<[^>]*>/g, '');

module.exports = { stripHtml };
