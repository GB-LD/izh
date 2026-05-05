import { forwardRef, useState } from "react";
import { useReducedMotion } from "motion/react";

interface AnswerOptionProps {
  label: string;
  emoji?: string;
  onClick: () => void;
  isPreSelected?: boolean;
}

export const AnswerOption = forwardRef<HTMLButtonElement, AnswerOptionProps>(
  ({ label, onClick, isPreSelected = false }, ref) => {
    const [isFlashing, setIsFlashing] = useState(false);
    const prefersReduced = useReducedMotion();

    const handleClick = () => {
      if (prefersReduced) {
        onClick();
        return;
      }
      setIsFlashing(true);
      setTimeout(() => {
        setIsFlashing(false);
        onClick();
      }, 150);
    };

    const className = [
      "answer-option",
      isFlashing ? "answer-option--flashing" : "",
      isPreSelected && !isFlashing ? "answer-option--preselected" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        type="button"
        className={className}
        onClick={handleClick}
        role="option"
        aria-selected={isPreSelected}
      >
        {label}
      </button>
    );
  },
);

AnswerOption.displayName = "AnswerOption";
