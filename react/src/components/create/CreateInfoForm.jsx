import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function CreateInfoForm({ onSuccess }) {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    judul: "",
    kategoriKey: "kuliner",
    lokasi: "",
    ringkasan: "",
    deskripsiLengkap: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.isLoggedIn) {
      alert("Silakan masuk terlebih dahulu untuk membagikan informasi.");
      return;
    }
    alert("Informasi berhasil ditambahkan!");
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium mb-1">Judul Tempat / Promo</label>
        <input 
          type="text" 
          name="judul"
          required 
          placeholder="Warung Makan Bu Tini"
          value={formData.judul}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-xl border border-border-base dark:bg-bg-subtle focus:ring-2 ring-primary-base outline-none" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Kategori</label>
          <select 
            name="kategoriKey"
            value={formData.kategoriKey}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-border-base dark:bg-bg-subtle focus:ring-2 ring-primary-base outline-none"
          >
            <option value="kuliner">Kuliner Hemat</option>
            <option value="cetak">Cetak & Banner</option>
            <option value="laundry">Laundry & Kost</option>
            <option value="promo">Promo KTM Kampus</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Lokasi</label>
          <input 
            type="text" 
            name="lokasi"
            required 
            placeholder="Depan Gerbang Utama"
            value={formData.lokasi}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-border-base dark:bg-bg-subtle focus:ring-2 ring-primary-base outline-none" 
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Ringkasan Info Singkat</label>
        <input 
          type="text" 
          name="ringkasan"
          required 
          placeholder="Nasi + sayur sepuasnya cuma Rp 8.000!"
          maxLength="50"
          value={formData.ringkasan}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-xl border border-border-base dark:bg-bg-subtle focus:ring-2 ring-primary-base outline-none" 
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Deskripsi Lengkap & Review</label>
        <textarea 
          name="deskripsiLengkap"
          rows="4" 
          required
          placeholder="Warung ini cocok banget buat akhir bulan, harga murah meriah dan rasa memuaskan. Es teh gratis kalau tunjukin KTM."
          value={formData.deskripsiLengkap}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-xl border border-border-base dark:bg-bg-subtle focus:ring-2 ring-primary-base outline-none"
        ></textarea>
      </div>

      <button type="submit" className="w-full bg-primary-base hover:bg-primary-hover text-text-inverted font-medium py-3 rounded-xl transition shadow-lg shadow-primary-glow">
        Bagikan Informasi
      </button>
    </form>
  );
}
