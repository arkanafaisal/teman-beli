import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { communityData } from "../../data/community";
import FormInput from "../common/FormInput";
import { communitySchema } from "../../validations/communityFormValidation";
import { toast } from "sonner";
import { api } from "../../services/api";

export default function CommunityForm({ onSuccess, initialData = null, onDelete }) {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    judul: initialData?.judul || "",
    kategoriKey: initialData?.kategoriKey || "MAKAN",
    lokasi: initialData?.lokasi || "",
    ringkasan: initialData?.ringkasan || "",
    deskripsiLengkap: initialData?.deskripsiLengkap || "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
    let res;
    if (initialData?.id) {
      res = await api.community.update({ id: initialData.id, ...formData });
    } else {
      res = await api.community.create(formData);
    }
    setIsSubmitting(false);

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

      <button type="submit" disabled={isSubmitting} className="w-full bg-primary-base hover:bg-primary-hover text-text-inverted font-medium py-3 rounded-xl transition shadow-lg shadow-primary-glow disabled:opacity-50 disabled:cursor-not-allowed">
        {isSubmitting ? "Menyimpan..." : (initialData?.id ? "Simpan Perubahan" : communityData.form.submitButton)}
      </button>

      {initialData?.id && onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="cursor-pointer mt-3 w-full border border-danger-base text-danger-base hover:bg-danger-base hover:text-text-inverted font-medium py-3 rounded-xl transition"
        >
          Hapus Rekomendasi
        </button>
      )}
    </form>
  );
}
