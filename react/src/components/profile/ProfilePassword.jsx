import { useState } from "react";
import { api } from "../../services/api";
import { toast } from "sonner";
import { KeyRound } from "lucide-react";
import FormInput from "../common/FormInput";
import { setPasswordSchema } from "../../validations/authValidation";
import { profileData } from "../../data/profile";

export default function ProfilePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = setPasswordSchema.safeParse({ password, confirmPassword });
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    setLoading(true);
    try {
      const res = await api.user.setPassword({ password });
      if (res.success) {
        toast.success("Password berhasil diatur");
        setPassword("");
        setConfirmPassword("");
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Terjadi kesalahan server");
    } finally {
      setLoading(false);
    }
  };

  const data = profileData.passwordCard;

  return (
    <div className="bg-bg-surface p-6 rounded-3xl border border-border-base shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-primary-soft p-2 rounded-xl text-primary-base">
          <KeyRound className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-lg">{data.title}</h3>
      </div>
      <p className="text-sm text-text-muted mb-4">
        {data.description}
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          type="password"
          label={data.newPasswordLabel}
          placeholder={data.newPasswordPlaceholder}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <FormInput
          type="password"
          label={data.confirmPasswordLabel}
          placeholder={data.confirmPasswordPlaceholder}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer w-full bg-primary-base hover:bg-primary-hover disabled:opacity-50 text-text-inverted font-bold py-3 rounded-xl transition"
        >
          {loading ? data.buttonLoading : data.buttonNormal}
        </button>
      </form>
    </div>
  );
}
