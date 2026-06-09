import { forwardRef, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

interface AnswerOptionProps {
  label: string;
  onClick: () => void;
}

export const AnswerOption = forwardRef<HTMLButtonElement, AnswerOptionProps>(
  ({ label, onClick }, ref) => {
    const [isFlashing, setIsFlashing] = useState(false);
    const prefersReduced = useReducedMotion();
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

    // Clear a pending flash timer if the button unmounts mid-flash (rapid BACK,
    // GO_TO, or close) so we don't fire a stale onClick for the old answer.
    useEffect(() => () => clearTimeout(timeoutRef.current), []);

    const handleClick = () => {
      if (prefersReduced) {
        onClick();
        return;
      }
      setIsFlashing(true);
      timeoutRef.current = setTimeout(() => {
        setIsFlashing(false);
        onClick();
      }, 150);
    };

    const className = [
      "answer-option",
      isFlashing ? "answer-option--flashing" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        type="button"
        className={className}
        onClick={handleClick}
      >
        {label}
      </button>
    );
  },
);

AnswerOption.displayName = "AnswerOption";
