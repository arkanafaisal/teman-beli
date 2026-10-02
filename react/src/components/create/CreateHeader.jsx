import { createData } from "../../data/create";

export default function CreateHeader() {
  return (
    <header className="border-b border-border-base bg-bg-surface">
      <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="text-sm font-medium text-primary-text">
          {createData.header.backButton}
        </a>
        <h1 className="font-bold text-lg">{createData.header.title}</h1>
        <div></div>
      </div>
    </header>
  );
}
