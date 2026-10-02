import ProfileCard from "../components/profile/ProfileCard";
import ProfileReviews from "../components/profile/ProfileReviews";
import ProfileHistory from "../components/profile/ProfileHistory";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  if (!user.isLoggedIn) {
    return (
      <main className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 py-8 w-full flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold mb-2">Belum Masuk</h2>
        <p className="text-text-muted text-center mb-6">Silakan login menggunakan SSO Kampus untuk melihat profil Anda.</p>
        <button onClick={() => window.location.href = "/"} className="bg-primary-base hover:bg-primary-hover text-text-inverted px-6 py-3 rounded-xl font-bold transition shadow-lg shadow-primary-glow">
          Kembali ke Beranda
        </button>
      </main>
    );
  }

  return (
    <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12 w-full">
      <ProfileCard />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <ProfileReviews />
        <ProfileHistory />
      </div>
    </main>
  );
}
