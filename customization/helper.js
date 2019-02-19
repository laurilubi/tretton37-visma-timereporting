// Returns the full path of the image, based on if running locally or in production
// Needed because of the encoding bug that fails to send binary content (images) via MITM proxy
function img(relativeUrl) {
    return "{{imageBaseUrl}}" + relativeUrl;
}
