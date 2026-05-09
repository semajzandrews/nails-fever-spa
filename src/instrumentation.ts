const noopStorage: Storage = {
  getItem:    (_key: string)               => null,
  setItem:    (_key: string, _val: string) => {},
  removeItem: (_key: string)               => {},
  clear:      ()                           => {},
  key:        (_index: number)             => null,
  length:     0,
};

function needsPolyfill(obj: unknown): boolean {
  if (obj == null) return true;
  try {
    (obj as Storage).getItem("__test__");
    return false;
  } catch {
    return true;
  }
}

// Node.js 25+ ships a localStorage that exists but throws without --localstorage-file.
// Framer Motion v11 calls localStorage.getItem at module-init time, crashing SSR.
export async function register() {
  if (needsPolyfill(globalThis.localStorage)) {
    Object.defineProperty(globalThis, "localStorage", {
      value: noopStorage,
      writable: true,
      configurable: true,
    });
  }
  if (needsPolyfill(globalThis.sessionStorage)) {
    Object.defineProperty(globalThis, "sessionStorage", {
      value: noopStorage,
      writable: true,
      configurable: true,
    });
  }
}
