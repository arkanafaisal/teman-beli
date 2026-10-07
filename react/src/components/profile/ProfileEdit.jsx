import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { toast } from "sonner";
import { ChevronDown, ChevronUp } from "lucide-react";
import FormInput from "../common/FormInput";
import { updateProfileSchema } from "../../validations/authValidation";
import { profileData } from "../../data/profile";
import { useAuth } from "../../context/AuthContext";

import ActionModal from "../common/ActionModal";

export default function ProfileEdit() {
  const { user, login, logout } = useAuth();
  const [department, setDepartment] = useState(user.department || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (user.department) {
      setDepartment(user.department);
    }
  }, [user.department]);

  const handleDeleteAccount = async (confirmName) => {
    setIsDeleting(true);
    try {
      const res = await api.user.deleteProfile({ name: confirmName });
      if (res.success) {
        toast.success(res.message);
        setShowDeleteModal(false);
        logout(); // hapus state
        window.location.href = "/";
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { department };
    if (password) payload.password = password;

    const result = updateProfileSchema.safeParse(payload);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    setLoading(true);
    try {
      const res = await api.user.updateProfile(payload);
      if (res.success) {
        // Also update AuthContext manually without fully reloading session if possible
        login({ ...user, department });
        toast.success(res.message);
        setPassword(""); // Clear password field
        setIsExpanded(false); // Auto collapse on success
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Terjadi kesalahan server");
    } finally {
      setLoading(false);
    }
  };

  const data = profileData.editProfileCard;

  return (
    <div className="bg-bg-surface p-5 rounded-3xl border border-border-base shadow-sm">
      <div
        className="flex items-center justify-between cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="font-bold text-lg group-hover:text-primary-base transition-colors">{data.title}</h3>
        <div className="text-text-muted group-hover:text-primary-base transition-colors">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </div>

      <div
        className={`grid transition-all duration-300 ease-in-out ${isExpanded ? "grid-rows-[1fr] opacity-100 mt-5" : "grid-rows-[0fr] opacity-0"
          }`}
      >
        <div className="overflow-hidden px-1 pb-1 -mx-1 -mb-1">
          <form onSubmit={handleSubmit} className="space-y-4 pt-1">
            <FormInput
              type="text"
              label={data.departmentLabel}
              placeholder={data.departmentPlaceholder}
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
            <FormInput
              type="password"
              label={data.passwordLabel}
              placeholder={data.passwordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading || (department === (user.department || "") && !password)}
              className="cursor-pointer w-full bg-primary-base hover:bg-primary-hover disabled:opacity-50 text-text-inverted font-bold py-3 rounded-xl transition"
            >
              {loading ? data.buttonLoading : data.buttonNormal}
            </button>
          </form>

          {/* Delete Account Section */}
          <div className="mt-4 pt-4 border-t border-border-base">
            <button
              onClick={() => setShowDeleteModal(true)}
              className="cursor-pointer w-full bg-danger-base text-text-inverted font-bold py-3 rounded-xl hover:bg-danger-base hover:text-text-inverted transition active:scale-95"
            >
              {data.deleteAccountBtn}
            </button>
          </div>
        </div>
      </div>

      <ActionModal
        isOpen={showDeleteModal}
        type="prompt"
        icon="warning"
        title={data.deleteModalTitle}
        description={<span dangerouslySetInnerHTML={{ __html: data.deleteModalDesc.replace('{name}', user.name) }} />}
        matchText={user.name}
        confirmText={isDeleting ? data.deleteModalLoadingBtn : data.deleteModalConfirmBtn}
        cancelText="Batal"
        onConfirm={handleDeleteAccount}
        onCancel={() => {
          if (!isDeleting) setShowDeleteModal(false);
        }}
      />
    </div>
  );
}
