import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { communityData } from "../../data/community";
import FormInput from "../common/FormInput";
import { communitySchema } from "../../validations/communityFormValidation";
import { toast } from "sonner";
import { api } from "../../services/api";

export default function CommunityForm({ onSuccess }) {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    judul: "",
    kategoriKey: "MAKAN",
    lokasi: "",
    ringkasan: "",
    deskripsiLengkap: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.isLoggedIn) {
      toast.error(communityData.alerts.loginRequired);
      return;
    }

    const result = communitySchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach(err => {
        if (err.path[0]) fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      
      // Auto-scroll to the first field with error
      setTimeout(() => {
        const firstErrorEl = document.querySelector('.border-danger-base');
        if (firstErrorEl) {
          firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstErrorEl.focus();
        }
      }, 100);
      
      return;
    }

    // --- PANGGIL API BACKEND ---
    const res = await api.community.create(formData);
    
    if (res.success) {
      toast.success(res.message);
      if (onSuccess) {
        onSuccess();
      }
    } else {
      toast.error(res.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <FormInput 
        label={communityData.form.title.label}
        name="judul"
        required
        placeholder={communityData.form.title.placeholder}
        value={formData.judul}
        onChange={handleChange}
        error={errors.judul}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput 
          type="select"
          label={communityData.form.category.label}
          name="kategoriKey"
          value={formData.kategoriKey}
          onChange={handleChange}
          options={communityData.form.category.options}
          error={errors.kategoriKey}
        />
        <FormInput 
          label={communityData.form.location.label}
          name="lokasi"
          required
          placeholder={communityData.form.location.placeholder}
          value={formData.lokasi}
          onChange={handleChange}
          error={errors.lokasi}
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
        error={errors.ringkasan}
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
        error={errors.deskripsiLengkap}
      />

      <button type="submit" className="w-full bg-primary-base hover:bg-primary-hover text-text-inverted font-medium py-3 rounded-xl transition shadow-lg shadow-primary-glow">
        {communityData.form.submitButton}
      </button>
    </form>
  );
}
