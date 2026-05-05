import { useState } from "react";
import { useUIStore } from "@/stores/useUIStore";
import { useFlowStore } from "@/stores/useFlowStore";
import { useTaskStore } from "@/stores/useTaskStore";
import { OverlayShell } from "@/shared/OverlayShell";
import { TaskContextHeader } from "@/shared/TaskContextHeader";
import { QuadrantButton } from "@/shared/QuadrantButton";
import { Button } from "@/shared/Button";
import { Questionnaire } from "@/features/sorting/Questionnaire";
import type { Quadrant } from "@/schemas/task";
import type { TerminalResult } from "@/lib/questionnaire";

type SortingStep = "choice" | "questionnaire" | "result";

const QUADRANTS: Quadrant[] = ["q1", "q2", "q3", "q4"];

export function SortingOverlay() {
  const [step, setStep] = useState<SortingStep>("choice");

  const isOpen = useUIStore((s) => s.activeOverlay === "sorting");
  const closeOverlay = useUIStore((s) => s.closeOverlay);
  const taskId = useFlowStore((s) => s.taskId);
  const startFlow = useFlowStore((s) => s.startFlow);
  const resetFlow = useFlowStore((s) => s.resetFlow);
  const task = useTaskStore(
    (s) => s.tasks.find((t) => t.id === taskId) ?? null,
  );
  const classifyTask = useTaskStore((s) => s.classifyTask);

  function handleClose() {
    closeOverlay();
    resetFlow();
    setStep("choice");
  }

  function handleManualClassify(quadrant: Quadrant) {
    if (!taskId) return;
    classifyTask(taskId, quadrant, "manual");
    setStep("result");
  }

  function handleAssistedStart() {
    if (!taskId) return;
    startFlow(taskId);
    setStep("questionnaire");
  }

  function handleQuestionnaireResult(result: TerminalResult) {
    if (!taskId) return;
    classifyTask(taskId, result.quadrant, "assisted", result.sourceFlux);
    setStep("result");
  }

  return (
    <OverlayShell
      isOpen={isOpen}
      onClose={handleClose}
      variant="flow"
      aria-labelledby="sorting-task-title"
    >
      {step === "choice" && task && (
        <div className="sorting-overlay__content">
          <TaskContextHeader title={task.title} id="sorting-task-title" />
          <div className="sorting-overlay__actions">
            <Button variant="primary" block onClick={handleAssistedStart}>
              Aide-moi à décider
            </Button>
            <div className="sorting-overlay__grid">
              {QUADRANTS.map((q) => (
                <QuadrantButton
                  key={q}
                  quadrant={q}
                  onClick={handleManualClassify}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {step === "questionnaire" && task && (
        <Questionnaire
          taskTitle={task.title}
          onResult={handleQuestionnaireResult}
        />
      )}

      {step === "result" && <div>{/* TODO Story 3.4 */}</div>}
    </OverlayShell>
  );
}
