interface TaskContextHeaderProps {
  title: string;
  id?: string;
}

export function TaskContextHeader({ title, id }: TaskContextHeaderProps) {
  return (
    <div className="task-context-header">
      <h2 className="task-context-header__title" id={id}>
        {title}
      </h2>
    </div>
  );
}
