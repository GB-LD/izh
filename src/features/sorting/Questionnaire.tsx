import { useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import type { useFlowReducer } from "@/hooks/useFlowReducer";
import { AnswerOption } from "@/shared/AnswerOption";
import { ProgressDots } from "@/shared/ProgressDots";
import { TaskContextHeader } from "@/shared/TaskContextHeader";
import type { TerminalResult } from "@/lib/questionnaire";

interface Props {
  taskTitle: string;
  flow: ReturnType<typeof useFlowReducer>;
  onResult: (result: TerminalResult) => void;
}

export function Questionnaire({ taskTitle, flow, onResult }: Props) {
  const {
    currentNode,
    currentQuestion,
    progressState,
    direction,
    done,
    dispatch,
  } = flow;

  const prefersReduced = useReducedMotion();
  const firstOptionRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (done) onResult(done);
  }, [done, onResult]);

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
      <TaskContextHeader title={taskTitle} />

      <div className="question-card__body">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentNode}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            onAnimationComplete={(definition) => {
              // Focus the first option only once the entering question has
              // settled — with `mode="wait"` the new content mounts after the
              // outgoing one finishes exiting, so focusing earlier would land
              // on the element being removed.
              if (definition === "animate") firstOptionRef.current?.focus();
            }}
          >
            <h3 className="question-card__title">{currentQuestion.text}</h3>

            <div
              role="group"
              className="question-card__answers"
              aria-label={`Question ${progressState.stepIndex + 1} sur ${progressState.totalSteps}`}
            >
              {currentQuestion.answers.map((answer, idx) => (
                <AnswerOption
                  key={answer.label}
                  label={answer.label}
                  onClick={() => dispatch({ type: "ANSWER", answer })}
                  ref={idx === 0 ? firstOptionRef : undefined}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <ProgressDots
        stepIndex={progressState.stepIndex}
        total={progressState.totalSteps}
        onNavigate={(index) => dispatch({ type: "GO_TO", index })}
      />
    </div>
  );
}
