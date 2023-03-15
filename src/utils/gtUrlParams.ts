/** Helper to get value from url string */
export function getUrlParam(
    param: string // param name
    ): string | null {
    const queryString = window.location.search; // get query string from url
    const urlParams = new URLSearchParams(queryString); // create url params object
    return urlParams.get(param); // get param value
}
