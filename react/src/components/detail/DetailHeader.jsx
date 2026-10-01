import { detailData } from "../../data/detail";

export default function DetailHeader() {
  return (
    <header className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="text-sm font-medium text-blue-600 dark:text-blue-400">
          {detailData.header.backButton}
        </a>
        <div id="auth-nav"></div>
      </div>
    </header>
  );
}
