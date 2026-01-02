"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/shared/ui/Button";
import { Trash2, AlertTriangle, Eye, EyeOff } from "lucide-react";

export default function AccountSettingsPage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmationText, setConfirmationText] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDeleteAccount = async () => {
    if (confirmationText !== "DELETE MY ACCOUNT") {
      setError("Please type 'DELETE MY ACCOUNT' to confirm");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/account/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${useAuthStore.getState().accessToken}`,
        },
        body: JSON.stringify({
          password,
          confirmationText,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Log out and redirect to home
        logout();
        router.push("/");
      } else {
        setError(data.message || "Failed to delete account");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-moot-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-moot-text mb-2">Account Settings</h1>
          <p className="text-moot-textMuted">Manage your account preferences and security</p>
        </div>

        {/* Account Info */}
        <div className="bg-moot-surface rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-moot-text mb-4">Account Information</h2>
          <div className="space-y-3">
            <div>
              <span className="text-moot-textMuted">Username:</span>
              <span className="ml-2 text-moot-text">{user?.username}</span>
            </div>
            <div>
              <span className="text-moot-textMuted">Email:</span>
              <span className="ml-2 text-moot-text">{user?.email}</span>
            </div>
            <div>
              <span className="text-moot-textMuted">Account ID:</span>
              <span className="ml-2 text-moot-text font-mono text-sm">{user?.id}</span>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-moot-surface rounded-lg p-6 border-2 border-moot-error/20">
          <h2 className="text-xl font-semibold text-moot-error mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Danger Zone
          </h2>
          <p className="text-moot-textMuted mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button
            variant="danger"
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete Account
          </Button>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-moot-surface rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-moot-text mb-4">Delete Account</h2>

            <div className="bg-moot-error/10 border border-moot-error/50 rounded-lg p-4 mb-6">
              <p className="text-moot-text text-sm">
                <strong className="text-moot-error">Warning:</strong> This action is permanent and cannot be undone.
              </p>
              <ul className="mt-2 text-sm text-moot-textMuted space-y-1">
                <li>• All your personal data will be deleted</li>
                <li>• Your messages will be anonymized</li>
                <li>• You will lose access to all servers</li>
                <li>• This cannot be reversed</li>
              </ul>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              {/* Password Field */}
              <div>
                <label className="block text-moot-textMuted text-sm mb-2">
                  Enter your password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field w-full pr-10"
                    placeholder="Your password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-moot-textMuted hover:text-moot-text"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirmation Text */}
              <div>
                <label className="block text-moot-textMuted text-sm mb-2">
                  Type <span className="font-mono font-bold text-moot-error">DELETE MY ACCOUNT</span> to confirm
                </label>
                <input
                  type="text"
                  value={confirmationText}
                  onChange={(e) => setConfirmationText(e.target.value)}
                  className="input-field w-full"
                  placeholder="DELETE MY ACCOUNT"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowDeleteModal(false);
                  setPassword("");
                  setConfirmationText("");
                  setError("");
                }}
                disabled={loading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleDeleteAccount}
                disabled={loading || !password || confirmationText !== "DELETE MY ACCOUNT"}
                className="flex-1"
              >
                {loading ? "Deleting..." : "Delete Account"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}