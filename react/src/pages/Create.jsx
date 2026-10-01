import CreateHeader from "../components/create/CreateHeader";
import CreateForm from "../components/create/CreateForm";

export default function Create() {
  return (
    <>
      <CreateHeader />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <CreateForm />
      </main>
    </>
  );
}
