import CreateHeader from "../components/create/CreateHeader";
import CreateForm from "../components/create/CreateForm";

export default function Create() {
  return (
    <>
      <CreateHeader />
      <main className="max-w-2xl mx-auto px-4 sm:px-0 py-8">
        <div className="bg-bg-surface p-6 rounded-2xl border border-border-base shadow-sm">
          <CreateForm />
        </div>
      </main>
    </>
  );
}
