interface TaskContextHeaderProps {
  title: string;
  id?: string;
}

export function TaskContextHeader({ title, id }: TaskContextHeaderProps) {
  return (
    <div className="task-context-header">
      <div className="task-context-header__text">
        <span className="task-context-header__label">Tâche à trier</span>
        <h2 className="task-context-header__title" id={id}>
          {title}
        </h2>
      </div>
    </div>
  );
}
