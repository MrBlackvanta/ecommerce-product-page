const observers = new Set<() => void>();

export function installLargestPaint() {
  observers.clear();

  globalThis.PerformanceObserver = class {
    static supportedEntryTypes = ["largest-contentful-paint"];
    callback: () => void;

    constructor(callback: () => void) {
      this.callback = callback;
    }

    observe() {
      observers.add(this.callback);
    }

    disconnect() {
      observers.delete(this.callback);
    }
  } as unknown as typeof PerformanceObserver;
}

export function paintLargestContent() {
  observers.forEach((callback) => callback());
}
