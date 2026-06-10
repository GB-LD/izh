import { useEffect, useRef } from "react";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/shared/Button";
import { MAX_BACKLOG_SIZE } from "@/lib/constants";

interface ReserveFullNoticeProps {
  onPurge: () => void;
  onClose: () => void;
}

export function ReserveFullNotice({
  onPurge,
  onClose,
}: ReserveFullNoticeProps) {
  const purgeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    purgeRef.current?.focus();
  }, []);

  return (
    <div className="result-card" role="alert">
      <div className="result-state">
        <span className="result-medallion result-medallion--warning">
          <TriangleAlert size={30} aria-hidden="true" />
        </span>
        <h2 className="result-state__title">Réserve pleine</h2>
        <p className="result-state__subtitle">
          Ta Réserve est pleine ({MAX_BACKLOG_SIZE}/{MAX_BACKLOG_SIZE}). Fais de
          la place pour pouvoir trier de nouvelles tâches.
        </p>
        <div className="result-state__actions">
          <Button ref={purgeRef} variant="primary" onClick={onPurge}>
            Purger
          </Button>
          <Button variant="text" onClick={onClose}>
            Revenir au Vrac
          </Button>
        </div>
      </div>
    </div>
  );
}
