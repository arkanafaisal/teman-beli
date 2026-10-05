import { useState } from "react";
import { patunganData } from "../../data/patungan";
import { useAuth } from "../../context/AuthContext";
import FormInput from "../common/FormInput";
import { patunganSchema, updatePatunganSchema } from "../../validations/patunganFormValidation";
import { toast } from "sonner";
import { api } from "../../services/api";
import ActionModal from "../common/ActionModal";

export default function PatunganForm({ onSuccess, initialData }) {
  const { user } = useAuth();
  const isEditMode = !!initialData;

  const getLocalDatetimeLocal = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    const pad = (n) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    category: initialData?.category || "KAMPUS",
    unit: initialData?.unit || "",
    targetQuota: initialData?.targetQuota || "",
    totalPrice: initialData?.totalPrice || "",
    currentQuota: initialData?.currentQuota || "",
    area: initialData?.area || "",
    deadline: getLocalDatetimeLocal(initialData?.deadline),
    whatsapp: initialData?.whatsapp || "",
    notes: initialData?.notes || "",
    refLink: initialData?.refLink || "",
    updateComment: ""
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

    const schemaToUse = isEditMode ? updatePatunganSchema : patunganSchema;
    const result = schemaToUse.safeParse(formData);
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
    const res = isEditMode 
      ? await api.patungan.update(initialData.id, formData)
      : await api.patungan.create(formData);

    if (res.success) {
      toast.success(isEditMode ? "Pembaruan berhasil disimpan!" : patunganData.alerts.successMessage);
      if (onSuccess) {
        onSuccess();
      } else {
        window.location.href = "/";
      }
    } else {
      toast.error(res.message || "Terjadi kesalahan, silakan coba lagi.");
    }
  };

  const [showCancelModal, setShowCancelModal] = useState(false);

  const executeCancelPatungan = async () => {
    setShowCancelModal(false);
    const res = await api.patungan.updateStatus(initialData.id, { status: "CANCELLED" });
    if (res.success || !res.message) {
      toast.success("Patungan berhasil dibatalkan");
      if (onSuccess) onSuccess();
    } else {
      toast.error(res.message || "Gagal membatalkan patungan");
    }
  };

  const handleCancelPatungan = () => {
    setShowCancelModal(true);
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
          maxLength={15}
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
          suffix={formData.unit || "satuan"}
          error={errors.targetQuota}
        />
        <FormInput
          type="text"
          label={patunganData.form.totalPrice.label}
          name="totalPrice"
          required
          placeholder={patunganData.form.totalPrice.placeholder}
          value={formData.totalPrice ? Number(formData.totalPrice).toLocaleString('id-ID') : ""}
          onChange={(e) => {
            const rawValue = e.target.value.replace(/\D/g, "");
            setFormData(prev => ({ ...prev, totalPrice: rawValue }));
            if (errors.totalPrice) setErrors(prev => ({ ...prev, totalPrice: undefined }));
          }}
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
          suffix={formData.unit || "satuan"}
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
          type="datetime-local"
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

      {isEditMode && (
        <div className="pt-4 border-t border-border-base">
          <FormInput
            type="textarea"
            label={patunganData.form.updateComment.label}
            name="updateComment"
            rows="2"
            required
            placeholder={patunganData.form.updateComment.placeholder}
            value={formData.updateComment}
            onChange={handleChange}
            error={errors.updateComment}
          />
        </div>
      )}

      <button type="submit" className="cursor-pointer w-full bg-primary-base hover:bg-primary-hover text-text-inverted font-medium py-3 rounded-xl transition shadow-lg shadow-primary-glow">
        {isEditMode ? patunganData.form.saveChangesButton : patunganData.form.submitButton}
      </button>

      {isEditMode && initialData?.status !== 'FINISHED' && initialData?.status !== 'CANCELLED' && (
        <button 
          type="button" 
          onClick={handleCancelPatungan}
          className="cursor-pointer mt-3 w-full border border-danger-base text-danger-base hover:bg-danger-base hover:text-text-inverted font-medium py-3 rounded-xl transition"
        >
          Batalkan Patungan
        </button>
      )}

      <ActionModal
        isOpen={showCancelModal}
        type="confirm"
        icon="warning"
        title="Batalkan Patungan?"
        description="Apakah Anda yakin ingin membatalkan patungan ini? Tindakan ini tidak dapat diurungkan dan sisa kuota akan dikosongkan."
        confirmText="Ya, Batalkan"
        cancelText="Kembali"
        onConfirm={executeCancelPatungan}
        onCancel={() => setShowCancelModal(false)}
      />
    </form>
  );
}
