import { BottomNav } from "./BottomNav";
import { SidebarNav } from "./SidebarNav";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <SidebarNav />
      <main className="layout__content">{children}</main>
      <BottomNav />
    </div>
  );
}
