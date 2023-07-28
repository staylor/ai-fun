// This method is not exactly compliant with the spec, but it's good enough for our purposes.
export function requestIdleCallback(
  callback: IdleRequestCallback,
  options?: IdleRequestOptions,
): void {
  if (window.requestIdleCallback) {
    window.requestIdleCallback(callback, options);
  } else {
    // Safari doesn't support requestIdleCallback
    // https://caniuse.com/requestidlecallback
    window.setTimeout(callback, options?.timeout ?? 1);
  }
}
