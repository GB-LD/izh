import { useState } from "react";
import { useNavigate } from "react-router";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { useUIStore } from "@/stores/useUIStore";
import { useFlowStore } from "@/stores/useFlowStore";
import { useTaskStore } from "@/stores/useTaskStore";
import { useFlowReducer } from "@/hooks/useFlowReducer";
import { MAX_BACKLOG_SIZE } from "@/lib/constants";
import { OverlayShell } from "@/shared/OverlayShell";
import { TaskContextHeader } from "@/shared/TaskContextHeader";
import { QuadrantButton } from "@/shared/QuadrantButton";
import { Button } from "@/shared/Button";
import { Questionnaire } from "@/features/sorting/Questionnaire";
import { SortConfirmation } from "@/features/sorting/SortConfirmation";
import { SortResult } from "@/features/sorting/SortResult";
import { ReserveFullNotice } from "@/features/sorting/ReserveFullNotice";
import type { Quadrant, SourceFlux } from "@/schemas/task";
import type { TerminalResult } from "@/lib/questionnaire";

type SortingStep = "choice" | "questionnaire" | "confirmation" | "result";

const QUADRANTS: Quadrant[] = ["q1", "q2", "q3", "q4"];

export function SortingOverlay() {
  const [step, setStep] = useState<SortingStep>("choice");
  const [proposal, setProposal] = useState<TerminalResult | null>(null);
  const flow = useFlowReducer();
  const isDesktop = useIsDesktop();
  const navigate = useNavigate();

  const isOpen = useUIStore((s) => s.activeOverlay === "sorting");
  const closeOverlay = useUIStore((s) => s.closeOverlay);
  const taskId = useFlowStore((s) => s.taskId);
  const startFlow = useFlowStore((s) => s.startFlow);
  const resetFlow = useFlowStore((s) => s.resetFlow);
  const task = useTaskStore(
    (s) => s.tasks.find((t) => t.id === taskId) ?? null,
  );
  const classifyTask = useTaskStore((s) => s.classifyTask);
  const inboxCount = useTaskStore(
    (s) => s.tasks.filter((t) => t.status === "inbox").length,
  );
  const reserveFull = useTaskStore(
    (s) =>
      s.tasks.filter((t) => t.status === "backlog").length >= MAX_BACKLOG_SIZE,
  );

  // Session counter — snapshot the number of tasks to sort when the overlay
  // opens, kept across the "next task" chain, reset on close (AC8). Captured
  // on the open/close transition via the render-phase state-adjustment pattern
  // (https://react.dev/reference/react/useState#storing-information-from-previous-renders).
  const [sessionTotal, setSessionTotal] = useState<number | null>(null);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    setSessionTotal(isOpen ? inboxCount : null);
  }

  const total = sessionTotal ?? inboxCount;
  const progress = { total, sorted: total - inboxCount };

  function handleClose() {
    closeOverlay();
    resetFlow();
    setStep("choice");
    setProposal(null);
  }

  // Reserve-full is blocked upstream (see the "choice" gate below), so by the
  // time we get here classification always succeeds — just classify & advance.
  function classifyAndAdvance(
    quadrant: Quadrant,
    sourceFlux: SourceFlux | undefined,
    userOverride: boolean | null,
  ) {
    if (!taskId) return;
    classifyTask(
      taskId,
      quadrant,
      userOverride === null ? "manual" : "assisted",
      sourceFlux,
      userOverride,
    );
    setStep("result");
  }

  function handleManualClassify(quadrant: Quadrant) {
    classifyAndAdvance(quadrant, undefined, null);
  }

  function handleAssistedStart() {
    if (!taskId) return;
    startFlow(taskId);
    setStep("questionnaire");
  }

  function handleQuestionnaireResult(result: TerminalResult) {
    setProposal(result);
    setStep("confirmation");
  }

  function handleConfirm() {
    if (!proposal) return;
    classifyAndAdvance(proposal.quadrant, proposal.sourceFlux, false);
  }

  function handleOverride(quadrant: Quadrant) {
    if (!proposal) return;
    classifyAndAdvance(quadrant, proposal.sourceFlux, true);
  }

  function handleNextTask() {
    const next = useTaskStore.getState().getInboxTasks()[0];
    if (!next) return;
    startFlow(next.id);
    setProposal(null);
    setStep("choice");
  }

  function handleSeeReserve() {
    handleClose();
    navigate("/reserve");
  }

  function handlePurge() {
    // TODO Epic 7 : ouvrir directement l'overlay de purge
    handleClose();
    navigate("/reserve");
  }

  const headerStart =
    isDesktop && step === "questionnaire" ? (
      <button
        type="button"
        className="btn btn-text btn-sm"
        onClick={
          flow.canGoBack ? () => flow.dispatch({ type: "BACK" }) : undefined
        }
        aria-label="Retour à la question précédente"
        aria-hidden={!flow.canGoBack || undefined}
        tabIndex={!flow.canGoBack ? -1 : undefined}
        style={!flow.canGoBack ? { visibility: "hidden" } : undefined}
      >
        ← Retour
      </button>
    ) : undefined;

  return (
    <OverlayShell
      isOpen={isOpen}
      onClose={handleClose}
      variant="flow"
      aria-labelledby="sorting-task-title"
      headerStart={headerStart}
    >
      {step === "choice" && task && reserveFull && (
        <ReserveFullNotice onPurge={handlePurge} onClose={handleClose} />
      )}

      {step === "choice" && task && !reserveFull && (
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
          flow={flow}
          onResult={handleQuestionnaireResult}
        />
      )}

      {step === "confirmation" && task && proposal && (
        <SortConfirmation
          taskTitle={task.title}
          proposedQuadrant={proposal.quadrant}
          progress={progress}
          onConfirm={handleConfirm}
          onOverride={handleOverride}
        />
      )}

      {step === "result" && task && (
        <SortResult
          task={task}
          progress={progress}
          vracEmpty={inboxCount === 0}
          onNextTask={handleNextTask}
          onSeeReserve={handleSeeReserve}
        />
      )}
    </OverlayShell>
  );
}
