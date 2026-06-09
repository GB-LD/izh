import { useEffect, useRef, useState } from "react";
import type { ReactNode, RefObject } from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useDragControls,
  useReducedMotion,
} from "motion/react";
import { X } from "lucide-react";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useIsDesktop } from "@/hooks/useIsDesktop";

type OverlayVariant = "flow" | "micro";

const BACKDROP_ANIMATION = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const SHELL_ANIMATIONS = {
  reduced: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  },
  desktop: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" as const },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" as const },
    },
  },
  mobile: {
    initial: { y: "100%" },
    animate: { y: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
    exit: { y: "100%", transition: { duration: 0.3, ease: "easeIn" as const } },
  },
};

type OverlayShellProps = {
  isOpen: boolean;
  onClose: () => void;
  variant: OverlayVariant;
  children: ReactNode;
  triggerRef?: RefObject<HTMLElement | null>;
  "aria-labelledby"?: string;
  /** Optional content rendered at the start (left) of the header, e.g. a back
   *  button. When provided, the header also renders on mobile. */
  headerStart?: ReactNode;
};

export function OverlayShell({
  isOpen,
  onClose,
  variant,
  children,
  triggerRef,
  "aria-labelledby": ariaLabelledBy,
  headerStart,
}: OverlayShellProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);
  const dragControls = useDragControls();
  const [isDragging, setIsDragging] = useState(false);
  const isDesktop = useIsDesktop();
  const shouldReduceMotion = useReducedMotion();

  useFocusTrap(isOpen, shellRef);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    triggerElementRef.current =
      triggerRef?.current instanceof HTMLElement
        ? triggerRef.current
        : document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const root = document.getElementById("root");
    root?.setAttribute("inert", "");

    return () => {
      document.body.style.overflow = previousOverflow;
      root?.removeAttribute("inert");
      triggerElementRef.current?.focus();
    };
  }, [isOpen, triggerRef]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      event.preventDefault();
      onClose();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (typeof document === "undefined") {
    return null;
  }

  const shellAnimationKey = shouldReduceMotion
    ? "reduced"
    : isDesktop
      ? "desktop"
      : "mobile";
  const shellAnimation = SHELL_ANIMATIONS[shellAnimationKey];

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            className={
              variant === "micro"
                ? "overlay-backdrop overlay-backdrop--micro"
                : "overlay-backdrop"
            }
            initial={BACKDROP_ANIMATION.initial}
            animate={BACKDROP_ANIMATION.animate}
            exit={BACKDROP_ANIMATION.exit}
            onClick={onClose}
          />

          <motion.div
            ref={shellRef}
            className={`overlay-shell overlay-shell--${variant}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={ariaLabelledBy}
            initial={shellAnimation.initial}
            animate={shellAnimation.animate}
            exit={shellAnimation.exit}
            drag={!isDesktop ? "y" : false}
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            dragMomentum={false}
            onDragEnd={(_, info) => {
              setIsDragging(false);
              if (info.offset.y > 80 || info.velocity.y > 500) {
                onClose();
              }
            }}
          >
            {!isDesktop ? (
              <div
                className="overlay-handle"
                aria-hidden="true"
                onPointerDown={(e) => {
                  setIsDragging(true);
                  dragControls.start(e);
                }}
                onPointerUp={() => setIsDragging(false)}
                onPointerCancel={() => setIsDragging(false)}
              >
                <div
                  className={`overlay-handle-bar${isDragging ? " overlay-handle-bar--active" : ""}`}
                />
              </div>
            ) : null}

            {isDesktop || headerStart ? (
              <div className="overlay-header">
                <div className="overlay-header__start">{headerStart}</div>
                {isDesktop ? (
                  <button
                    type="button"
                    className="btn btn-icon-only btn-text btn-sm"
                    onClick={onClose}
                    aria-label="Fermer"
                  >
                    <X size={16} aria-hidden="true" />
                  </button>
                ) : null}
              </div>
            ) : null}

            <div className="overlay-shell__content">{children}</div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>,
    document.getElementById("overlay-root") ?? document.body,
  );
}
