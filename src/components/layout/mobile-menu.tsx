"use client";

import { CloseIcon, MenuIcon } from "@/components/icons";
import { holdPageBehind } from "@/lib";
import { type RefObject, useEffect, useRef, useState } from "react";
import NavLinks from "./nav-links";

const TAB_STOPS = "a[href], button";

function focusOnceVisible(ref: RefObject<HTMLElement | null>) {
  let frame = requestAnimationFrame(() => {
    frame = requestAnimationFrame(() => ref.current?.focus());
  });
  return () => cancelAnimationFrame(frame);
}

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => (open ? holdPageBehind() : undefined), [open]);

  useEffect(() => {
    if (!open) return;

    const settle = focusOnceVisible(panel);
    const button = trigger.current;
    return () => {
      settle();
      button?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const close = () => setOpen(false);
    const desktop = window.matchMedia("(min-width: 64rem)");

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") return close();
      if (event.key !== "Tab" || !panel.current) return;

      const stops = [...panel.current.querySelectorAll<HTMLElement>(TAB_STOPS)];
      const [first] = stops;
      const last = stops.at(-1);
      const onFirst =
        document.activeElement === first ||
        document.activeElement === panel.current;

      if (event.shiftKey && onFirst) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    desktop.addEventListener("change", close);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      desktop.removeEventListener("change", close);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  const closeOnBackdrop = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) close();
  };

  return (
    <div className="flex lg:hidden">
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="-m-2 flex p-2 text-muted v-focus"
      >
        <MenuIcon />
      </button>

      <div
        role="presentation"
        onClick={closeOnBackdrop}
        inert={!open}
        className={`fixed inset-0 z-50 duration-300 motion-safe:transition-[background-color,visibility] ${open ? "visible bg-black/75" : "invisible bg-black/0"}`}
      >
        <div
          ref={panel}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          tabIndex={-1}
          className={`h-full w-62.5 overflow-y-auto bg-white px-6 pt-6 duration-300 outline-none motion-safe:transition-transform md:w-75.25 md:px-20 md:pt-12 ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="-m-2 flex p-2 text-muted v-focus"
          >
            <CloseIcon />
          </button>
          <NavLinks variant="menu" onNavigate={close} />
        </div>
      </div>
    </div>
  );
}
