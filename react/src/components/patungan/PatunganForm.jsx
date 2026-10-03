import { useState } from "react";
import { patunganData } from "../../data/patungan";
import { useAuth } from "../../context/AuthContext";
import FormInput from "../common/FormInput";

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

  const calculateUnitPrice = () => {
    const target = parseFloat(formData.targetQuota) || 0;
    const price = parseFloat(formData.totalPrice) || 0;
    return target > 0 ? Math.round(price / target) : 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.isLoggedIn) {
      alert(patunganData.alerts.loginRequired);
      return;
    }
    alert(patunganData.alerts.successMessage);
    if (onSuccess) {
      onSuccess();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormInput
        label={patunganData.form.title.label}
        name="title"
        required
        placeholder={patunganData.form.title.placeholder}
        value={formData.title}
        onChange={handleChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          type="select"
          label={patunganData.form.category.label}
          name="category"
          value={formData.category}
          onChange={handleChange}
          options={patunganData.form.category.options}
        />
        <FormInput
          label={patunganData.form.unit.label}
          name="unit"
          required
          placeholder={patunganData.form.unit.placeholder}
          value={formData.unit}
          onChange={handleChange}
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
        />
        <FormInput
          type="number"
          label={patunganData.form.totalPrice.label}
          name="totalPrice"
          required
          placeholder={patunganData.form.totalPrice.placeholder}
          value={formData.totalPrice}
          onChange={handleChange}
        />
        <FormInput
          type="number"
          label={patunganData.form.currentQuota.label}
          name="currentQuota"
          required
          placeholder={patunganData.form.currentQuota.placeholder}
          value={formData.currentQuota}
          onChange={handleChange}
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
        />
        <FormInput
          type="date"
          label={patunganData.form.deadline.label}
          name="deadline"
          required
          value={formData.deadline}
          onChange={handleChange}
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
      />

      <FormInput
        type="textarea"
        label={patunganData.form.notes.label}
        name="notes"
        rows="3"
        placeholder={patunganData.form.notes.placeholder}
        value={formData.notes}
        onChange={handleChange}
      />

      <FormInput
        type="url"
        label={patunganData.form.refLink.label}
        name="refLink"
        placeholder={patunganData.form.refLink.placeholder}
        value={formData.refLink}
        onChange={handleChange}
      />

      <button type="submit" className="w-full bg-primary-base hover:bg-primary-hover text-text-inverted font-medium py-3 rounded-xl transition shadow-lg shadow-primary-glow">
        {patunganData.form.submitButton}
      </button>
    </form>
  );
}
