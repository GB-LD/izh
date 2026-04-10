import { DesignSystemPreview } from "./shared/design-system/DesignSystemPreview";
import { ErrorBoundary } from "./shared/ErrorBoundary";
import { InboxPage } from "./features/inbox/InboxPage";
import { BacklogPage } from "./features/backlog/BacklogPage";
import { FocusPage } from "./features/focus/FocusPage";
import { ArchivePage } from "./features/archive/ArchivePage";
import { Layout } from "./shared/Layout";
import { Route, Routes } from "react-router";

export function App() {
  return (
    <ErrorBoundary>
      <Layout>
        <Routes>
          <Route path="/" element={<InboxPage />} />
          <Route path="/backlog" element={<BacklogPage />} />
          <Route path="/focus" element={<FocusPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/design-system" element={<DesignSystemPreview />} />
        </Routes>
      </Layout>
    </ErrorBoundary>
  );
}
