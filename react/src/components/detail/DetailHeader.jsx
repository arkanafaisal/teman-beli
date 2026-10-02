import { detailData } from "../../data/detail";

export default function DetailHeader() {
  return (
    <header className="border-b border-border-base bg-bg-surface">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="text-sm font-medium text-primary-text">
          {detailData.header.backButton}
        </a>
        <div id="auth-nav"></div>
      </div>
    </header>
  );
}
