export function holdPageBehind() {
  const offset = window.scrollY;
  const { style } = document.body;
  style.position = "fixed";
  style.insetInline = "0";
  style.top = `${-offset}px`;

  return () => {
    style.position = "";
    style.insetInline = "";
    style.top = "";
    window.scrollTo({ top: offset, behavior: "instant" });
  };
}
