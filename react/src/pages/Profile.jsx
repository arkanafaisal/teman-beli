import ProfileCard from "../components/profile/ProfileCard";
import ProfileReviews from "../components/profile/ProfileReviews";
import ProfileHistory from "../components/profile/ProfileHistory";
import ProfileEdit from "../components/profile/ProfileEdit";
import { useAuth } from "../context/AuthContext";
import { LockKeyhole } from "lucide-react";

export default function Profile() {
  const { user, isInitializing } = useAuth();

  if (isInitializing) {
    return (
      <main className="flex-grow flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-base border-r-4 border-r-transparent mb-4"></div>
        <p className="text-text-muted font-medium text-sm">Memuat profil...</p>
      </main>
    );
  }

  if (!user.isLoggedIn) {
    return (
      <main className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 py-8 w-full flex flex-col items-center justify-center min-h-[60vh]">
        <div className="mb-4 text-text-muted"><LockKeyhole size={64} strokeWidth={1.5} /></div>
        <h2 className="text-2xl font-bold mb-2">Belum Masuk</h2>
        <p className="text-text-muted text-center mb-6">Silakan masuk menggunakan email kampus untuk melihat profil Anda.</p>
        <button onClick={() => window.dispatchEvent(new CustomEvent('open-auth-modal'))} className="cursor-pointer bg-primary-base hover:bg-primary-hover text-text-inverted px-6 py-3 rounded-xl font-bold transition shadow-lg shadow-primary-glow">
          Masuk / Daftar
        </button>
      </main>
    );
  }

  return (
    <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 py-8 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* SISI KIRI: Profil & Pengaturan */}
        <div className="lg:col-span-5 space-y-6">
          <ProfileCard />
          <ProfileEdit />
          <ProfileReviews />
        </div>

        {/* SISI KANAN: Riwayat Aktivitas / Patungan */}
        <div className="lg:col-span-7 bg-bg-surface p-6 rounded-3xl border border-border-base shadow-sm">
          <ProfileHistory />
        </div>

      </div>
    </main>
  );
}
