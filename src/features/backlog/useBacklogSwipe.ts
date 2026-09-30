import { useRef, type MouseEvent, type PointerEvent } from "react";

const SWIPE_REVEAL_PX = 24;
const SWIPE_COMMIT_PX = 48;
const SWIPE_AXIS_PX = 8;

interface SwipeGesture {
  pointerId: number;
  startX: number;
  startY: number;
  axis: "pending" | "horizontal" | "vertical";
}

export function useBacklogSwipe({
  isTouchOnly,
  onDeleteRevealChange,
}: {
  isTouchOnly: boolean;
  onDeleteRevealChange: (revealed: boolean) => void;
}) {
  const swipeGesture = useRef<SwipeGesture | null>(null);
  const suppressPointerClick = useRef(false);

  function isTouchTap(event: PointerEvent<HTMLElement>) {
    const gesture = swipeGesture.current;
    return (
      event.pointerType === "touch" &&
      gesture?.axis === "pending" &&
      Math.abs(event.clientX - gesture.startX) < SWIPE_AXIS_PX &&
      Math.abs(event.clientY - gesture.startY) < SWIPE_AXIS_PX
    );
  }

  return {
    isTouchTap,
    onPointerDownCapture(event: PointerEvent<HTMLLIElement>) {
      suppressPointerClick.current = false;
      swipeGesture.current = null;
      if (
        event.isPrimary === false ||
        (event.pointerType === "mouse" && isTouchOnly)
      )
        return;
      if ((event.target as HTMLElement).closest("[data-delete-action]")) return;
      if (!isTouchOnly && (event.target as HTMLElement).closest("button"))
        return;
      swipeGesture.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        axis: "pending",
      };
    },
    onPointerMove(event: PointerEvent<HTMLLIElement>) {
      const gesture = swipeGesture.current;
      if (!gesture || event.pointerId !== gesture.pointerId) return;
      const dx = event.clientX - gesture.startX;
      const dy = event.clientY - gesture.startY;
      if (gesture.axis === "pending") {
        if (Math.max(Math.abs(dx), Math.abs(dy)) < SWIPE_AXIS_PX) return;
        gesture.axis =
          Math.abs(dy) >= Math.abs(dx) || dx >= 0 ? "vertical" : "horizontal";
      }
      if (gesture.axis === "horizontal") {
        onDeleteRevealChange(-dx >= SWIPE_REVEAL_PX);
      }
    },
    onPointerUp(event: PointerEvent<HTMLLIElement>) {
      const gesture = swipeGesture.current;
      if (!gesture || event.pointerId !== gesture.pointerId) return;
      swipeGesture.current = null;
      const dx = event.clientX - gesture.startX;
      const dy = event.clientY - gesture.startY;
      if (gesture.axis === "pending") {
        gesture.axis =
          Math.abs(dx) >= SWIPE_AXIS_PX && Math.abs(dx) > Math.abs(dy) && dx < 0
            ? "horizontal"
            : "vertical";
      }
      if (gesture.axis !== "horizontal") return;
      suppressPointerClick.current = true;
      onDeleteRevealChange(-dx >= SWIPE_COMMIT_PX);
    },
    onPointerCancel() {
      if (swipeGesture.current?.axis === "horizontal") {
        onDeleteRevealChange(false);
      }
      swipeGesture.current = null;
    },
    onClickCapture(event: MouseEvent<HTMLLIElement>) {
      if (suppressPointerClick.current && event.detail !== 0) {
        suppressPointerClick.current = false;
        event.preventDefault();
        event.stopPropagation();
      }
    },
  };
}
