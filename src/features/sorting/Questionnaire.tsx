import { useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useFlowReducer } from "@/hooks/useFlowReducer";
import { AnswerOption } from "@/shared/AnswerOption";
import { ProgressDots } from "@/shared/ProgressDots";
import { TaskContextHeader } from "@/shared/TaskContextHeader";
import type { TerminalResult } from "@/lib/questionnaire";

interface Props {
  taskTitle: string;
  onResult: (result: TerminalResult) => void;
}

export function Questionnaire({ taskTitle, onResult }: Props) {
  const {
    currentNode,
    currentQuestion,
    canGoBack,
    previousAnswer,
    progressState,
    direction,
    done,
    dispatch,
  } = useFlowReducer();

  const prefersReduced = useReducedMotion();
  const firstOptionRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (done) onResult(done);
  }, [done, onResult]);

  useEffect(() => {
    firstOptionRef.current?.focus();
  }, [currentNode]);

  useEffect(() => {
    return () => dispatch({ type: "RESET" });
  }, [dispatch]);

  const slideVariants = prefersReduced
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { x: direction === "forward" ? "100%" : "-100%", opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { opacity: 0 },
      };

  const transition = { duration: 0.2, ease: "easeOut" as const };

  return (
    <div className="question-card">
      {canGoBack && (
        <button
          type="button"
          className="btn btn-text btn-sm question-card__back"
          onClick={() => dispatch({ type: "BACK" })}
          aria-label="Retour à la question précédente"
        >
          ← Retour
        </button>
      )}

      <TaskContextHeader title={taskTitle} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentNode}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transition}
        >
          {currentNode === "aiguillage" && (
            <p className="micro-text-reassuring" aria-hidden>
              Réponds à l&apos;instinct — il n&apos;y a pas de mauvaise réponse.
            </p>
          )}

          <h3 className="question-card__title">{currentQuestion.text}</h3>

          <div
            role="listbox"
            className="question-card__answers"
            aria-label={
              progressState
                ? `Question ${progressState.stepIndex + 1} sur ${progressState.totalSteps} : ${currentQuestion.text}`
                : currentQuestion.text
            }
            aria-live="polite"
          >
            {currentQuestion.answers.map((answer, idx) => (
              <AnswerOption
                key={answer.label}
                label={answer.label}
                onClick={() => dispatch({ type: "ANSWER", answer })}
                isPreSelected={previousAnswer?.label === answer.label}
                ref={idx === 0 ? firstOptionRef : undefined}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {progressState && (
        <ProgressDots
          stepIndex={progressState.stepIndex}
          total={progressState.totalSteps}
        />
      )}
    </div>
  );
}
