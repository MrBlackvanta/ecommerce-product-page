export function installImageDecode() {
  HTMLImageElement.prototype.decode = () => Promise.resolve();
}
