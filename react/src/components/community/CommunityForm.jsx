import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { communityData } from "../../data/community";
import FormInput from "../common/FormInput";

export default function CommunityForm({ onSuccess }) {
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
      <FormInput 
        label={communityData.form.title.label}
        name="judul"
        required
        placeholder={communityData.form.title.placeholder}
        value={formData.judul}
        onChange={handleChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput 
          type="select"
          label={communityData.form.category.label}
          name="kategoriKey"
          value={formData.kategoriKey}
          onChange={handleChange}
          options={communityData.form.category.options}
        />
        <FormInput 
          label={communityData.form.location.label}
          name="lokasi"
          required
          placeholder={communityData.form.location.placeholder}
          value={formData.lokasi}
          onChange={handleChange}
        />
      </div>

      <FormInput 
        label={communityData.form.summary.label}
        name="ringkasan"
        required
        placeholder={communityData.form.summary.placeholder}
        maxLength="50"
        value={formData.ringkasan}
        onChange={handleChange}
      />

      <FormInput 
        type="textarea"
        label={communityData.form.description.label}
        name="deskripsiLengkap"
        rows="4"
        required
        placeholder={communityData.form.description.placeholder}
        value={formData.deskripsiLengkap}
        onChange={handleChange}
      />

      <button type="submit" className="w-full bg-primary-base hover:bg-primary-hover text-text-inverted font-medium py-3 rounded-xl transition shadow-lg shadow-primary-glow">
        {communityData.form.submitButton}
      </button>
    </form>
  );
}
