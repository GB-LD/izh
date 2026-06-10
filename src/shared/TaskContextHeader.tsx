interface TaskContextHeaderProps {
  title: string;
  id?: string;
  variant?: "default" | "result";
}

export function TaskContextHeader({
  title,
  id,
  variant = "default",
}: TaskContextHeaderProps) {
  return (
    <div className={`task-context-header task-context-header--${variant}`}>
      <div className="task-context-header__text">
        {variant === "default" && (
          <span className="task-context-header__label">Tâche à trier</span>
        )}
        <h2 className="task-context-header__title" id={id}>
          {title}
        </h2>
      </div>
    </div>
  );
}
