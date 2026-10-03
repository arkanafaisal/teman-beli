import { useState } from "react";
import { patunganData } from "../../data/patungan";
import { useAuth } from "../../context/AuthContext";
import FormInput from "../common/FormInput";
import { patunganSchema } from "../../validations/patunganFormValidation";
import { toast } from "sonner";
import { api } from "../../services/api";

export default function PatunganForm({ onSuccess }) {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: "",
    category: "Alat Tulis & Cetak",
    unit: "",
    targetQuota: "",
    totalPrice: "",
    currentQuota: "",
    area: "",
    deadline: "",
    whatsapp: "",
    notes: "",
    refLink: ""
  });
  const [errors, setErrors] = useState({});

  const calculateUnitPrice = () => {
    const target = parseFloat(formData.targetQuota) || 0;
    const price = parseFloat(formData.totalPrice) || 0;
    return target > 0 ? Math.round(price / target) : 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.isLoggedIn) {
      toast.error(patunganData.alerts.loginRequired);
      return;
    }

    const result = patunganSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach(err => {
        if (err.path[0]) fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // --- PANGGIL API BACKEND ---
    const res = await api.patungan.create(formData);
    
    if (res.success) {
      toast.success(res.message || patunganData.alerts.successMessage);
      if (onSuccess) {
        onSuccess();
      } else {
        window.location.href = "/";
      }
    } else {
      toast.error(res.message || "Gagal membuat patungan.");
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <FormInput
        label={patunganData.form.title.label}
        name="title"
        required
        placeholder={patunganData.form.title.placeholder}
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          type="select"
          label={patunganData.form.category.label}
          name="category"
          value={formData.category}
          onChange={handleChange}
          options={patunganData.form.category.options}
          error={errors.category}
        />
        <FormInput
          label={patunganData.form.unit.label}
          name="unit"
          required
          placeholder={patunganData.form.unit.placeholder}
          value={formData.unit}
          onChange={handleChange}
          error={errors.unit}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormInput
          type="number"
          label={patunganData.form.targetQuota.label}
          name="targetQuota"
          required
          placeholder={patunganData.form.targetQuota.placeholder}
          value={formData.targetQuota}
          onChange={handleChange}
          error={errors.targetQuota}
        />
        <FormInput
          type="number"
          label={patunganData.form.totalPrice.label}
          name="totalPrice"
          required
          placeholder={patunganData.form.totalPrice.placeholder}
          value={formData.totalPrice}
          onChange={handleChange}
          error={errors.totalPrice}
        />
        <FormInput
          type="number"
          label={patunganData.form.currentQuota.label}
          name="currentQuota"
          required
          placeholder={patunganData.form.currentQuota.placeholder}
          value={formData.currentQuota}
          onChange={handleChange}
          error={errors.currentQuota}
        />
      </div>

      <div className="p-3 bg-primary-soft rounded-xl border border-primary-soft text-xs text-primary-text">
        {patunganData.form.unitPricePreview.label} <span className="font-bold">{patunganData.form.unitPricePreview.prefix} {calculateUnitPrice().toLocaleString('id-ID')}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label={patunganData.form.area.label}
          name="area"
          required
          placeholder={patunganData.form.area.placeholder}
          value={formData.area}
          onChange={handleChange}
          error={errors.area}
        />
        <FormInput
          type="date"
          label={patunganData.form.deadline.label}
          name="deadline"
          required
          value={formData.deadline}
          onChange={handleChange}
          error={errors.deadline}
        />
      </div>

      <FormInput
        label={patunganData.form.whatsapp.label}
        name="whatsapp"
        required
        placeholder={patunganData.form.whatsapp.placeholder}
        value={formData.whatsapp}
        onChange={handleChange}
        helpText={patunganData.form.whatsapp.helpText}
        error={errors.whatsapp}
      />

      <FormInput
        type="textarea"
        label={patunganData.form.notes.label}
        name="notes"
        rows="3"
        placeholder={patunganData.form.notes.placeholder}
        value={formData.notes}
        onChange={handleChange}
        error={errors.notes}
      />

      <FormInput
        type="url"
        label={patunganData.form.refLink.label}
        name="refLink"
        placeholder={patunganData.form.refLink.placeholder}
        value={formData.refLink}
        onChange={handleChange}
        error={errors.refLink}
      />

      <button type="submit" className="w-full bg-primary-base hover:bg-primary-hover text-text-inverted font-medium py-3 rounded-xl transition shadow-lg shadow-primary-glow">
        {patunganData.form.submitButton}
      </button>
    </form>
  );
}
