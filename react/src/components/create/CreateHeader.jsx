import { createData } from "../../data/create";

export default function CreateHeader() {
  return (
    <header className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
      <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="text-sm font-medium text-blue-600 dark:text-blue-400">
          {createData.header.backButton}
        </a>
        <h1 className="font-bold text-lg">{createData.header.title}</h1>
        <div></div>
      </div>
    </header>
  );
}
