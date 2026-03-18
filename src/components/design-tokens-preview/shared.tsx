export interface SwatchDef {
  label: string;
  bgClass: string;
  sub?: string;
}

export function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-6">
      <div>
        <h2 className="font-heading text-lg font-bold tracking-snug text-content">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm text-content-secondary">{subtitle}</p>
        )}
      </div>
      {children}
    </section>
  );
}

export function Divider() {
  return <hr className="border-edge" />;
}

export function Swatch({ label, bgClass, sub }: SwatchDef) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`h-14 w-20 rounded-component border border-edge ${bgClass}`}
      />
      <span className="text-xs text-content">{label}</span>
      {sub && <span className="text-xs text-content-tertiary">{sub}</span>}
    </div>
  );
}
