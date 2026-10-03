import { useState } from "react";
import { createData } from "../../data/create";
import { useAuth } from "../../context/AuthContext";

export default function CreateForm({ onSuccess }) {
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
      alert(createData.alerts.loginRequired);
      return;
    }
    alert(createData.alerts.successMessage);
    if (onSuccess) {
      onSuccess();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium mb-1">{createData.form.title.label}</label>
        <input 
          type="text" 
          name="title"
          required 
          placeholder={createData.form.title.placeholder}
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-xl border border-border-base dark:bg-bg-subtle focus:ring-2 ring-primary-base outline-none" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">{createData.form.category.label}</label>
          <select 
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-border-base dark:bg-bg-subtle focus:ring-2 ring-primary-base outline-none"
          >
            {createData.form.category.options.map((opt, idx) => (
              <option key={idx} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{createData.form.unit.label}</label>
          <input 
            type="text" 
            name="unit"
            required 
            placeholder={createData.form.unit.placeholder}
            value={formData.unit}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-border-base dark:bg-bg-subtle focus:ring-2 ring-primary-base outline-none" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">{createData.form.targetQuota.label}</label>
          <input 
            type="number" 
            name="targetQuota"
            required 
            placeholder={createData.form.targetQuota.placeholder}
            value={formData.targetQuota}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-border-base dark:bg-bg-subtle focus:ring-2 ring-primary-base outline-none" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{createData.form.totalPrice.label}</label>
          <input 
            type="number" 
            name="totalPrice"
            required 
            placeholder={createData.form.totalPrice.placeholder}
            value={formData.totalPrice}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-border-base dark:bg-bg-subtle focus:ring-2 ring-primary-base outline-none" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{createData.form.currentQuota.label}</label>
          <input 
            type="number" 
            name="currentQuota"
            required 
            placeholder={createData.form.currentQuota.placeholder}
            value={formData.currentQuota}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-border-base dark:bg-bg-subtle focus:ring-2 ring-primary-base outline-none" 
          />
        </div>
      </div>

      <div className="p-3 bg-primary-soft rounded-xl border border-primary-soft text-xs text-primary-text">
        {createData.form.unitPricePreview.label} <span className="font-bold">{createData.form.unitPricePreview.prefix} {calculateUnitPrice().toLocaleString('id-ID')}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">{createData.form.area.label}</label>
          <input 
            type="text" 
            name="area"
            required 
            placeholder={createData.form.area.placeholder}
            value={formData.area}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-border-base dark:bg-bg-subtle focus:ring-2 ring-primary-base outline-none" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{createData.form.deadline.label}</label>
          <input 
            type="date" 
            name="deadline"
            required 
            value={formData.deadline}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-border-base dark:bg-bg-subtle focus:ring-2 ring-primary-base outline-none" 
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">{createData.form.whatsapp.label}</label>
        <input 
          type="text" 
          name="whatsapp"
          required 
          placeholder={createData.form.whatsapp.placeholder}
          value={formData.whatsapp}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-xl border border-border-base dark:bg-bg-subtle focus:ring-2 ring-primary-base outline-none" 
        />
        <span className="text-xs text-text-muted">{createData.form.whatsapp.helpText}</span>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">{createData.form.notes.label}</label>
        <textarea 
          name="notes"
          rows="3" 
          placeholder={createData.form.notes.placeholder}
          value={formData.notes}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-xl border border-border-base dark:bg-bg-subtle focus:ring-2 ring-primary-base outline-none"
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">{createData.form.refLink.label}</label>
        <input 
          type="url" 
          name="refLink"
          placeholder={createData.form.refLink.placeholder}
          value={formData.refLink}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-xl border border-border-base dark:bg-bg-subtle focus:ring-2 ring-primary-base outline-none" 
        />
      </div>

      <button type="submit" className="w-full bg-primary-base hover:bg-primary-hover text-text-inverted font-medium py-3 rounded-xl transition shadow-lg shadow-primary-glow">
        {createData.form.submitButton}
      </button>
    </form>
  );
}
