import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { communityData } from "../../data/community";

export default function InfoForm({ onSuccess }) {
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
      alert(communityData.alerts.loginRequired);
      return;
    }
    alert(communityData.alerts.successMessage);
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium mb-1">{communityData.form.title.label}</label>
        <input 
          type="text" 
          name="judul"
          required 
          placeholder={communityData.form.title.placeholder}
          value={formData.judul}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-xl border border-border-base dark:bg-bg-subtle focus:ring-2 ring-primary-base outline-none" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">{communityData.form.category.label}</label>
          <select 
            name="kategoriKey"
            value={formData.kategoriKey}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-border-base dark:bg-bg-subtle focus:ring-2 ring-primary-base outline-none"
          >
            {communityData.form.category.options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{communityData.form.location.label}</label>
          <input 
            type="text" 
            name="lokasi"
            required 
            placeholder={communityData.form.location.placeholder}
            value={formData.lokasi}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-border-base dark:bg-bg-subtle focus:ring-2 ring-primary-base outline-none" 
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">{communityData.form.summary.label}</label>
        <input 
          type="text" 
          name="ringkasan"
          required 
          placeholder={communityData.form.summary.placeholder}
          maxLength="50"
          value={formData.ringkasan}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-xl border border-border-base dark:bg-bg-subtle focus:ring-2 ring-primary-base outline-none" 
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">{communityData.form.description.label}</label>
        <textarea 
          name="deskripsiLengkap"
          rows="4" 
          required
          placeholder={communityData.form.description.placeholder}
          value={formData.deskripsiLengkap}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-xl border border-border-base dark:bg-bg-subtle focus:ring-2 ring-primary-base outline-none"
        ></textarea>
      </div>

      <button type="submit" className="w-full bg-primary-base hover:bg-primary-hover text-text-inverted font-medium py-3 rounded-xl transition shadow-lg shadow-primary-glow">
        {communityData.form.submitButton}
      </button>
    </form>
  );
}
