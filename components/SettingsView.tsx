
import React, { useState, useMemo } from 'react';
import { User } from '../types';
import Card from './Card';

interface SettingsViewProps {
  user: User;
  onSave: (newNickname: string, newPassword?: string) => void;
  onBack: () => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ user, onSave, onBack }) => {
  const [nickname, setNickname] = useState(user.nickname);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const isPasswordDirty = newPassword.length > 0 || confirmPassword.length > 0;
  const isNicknameDirty = nickname.trim() !== user.nickname;
  const canSave = (isNicknameDirty && nickname.trim().length > 0) || (isPasswordDirty && newPassword === confirmPassword && newPassword.length >= 4);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isPasswordDirty) {
      if (newPassword.length < 4) {
        setError("New password must be at least 4 characters long.");
        return;
      }
      if (newPassword !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }
    
    if (canSave) {
        onSave(nickname.trim(), isPasswordDirty ? newPassword : undefined);
    }
  };

  const passwordMismatch = useMemo(() => {
    return isPasswordDirty && newPassword !== confirmPassword;
  }, [isPasswordDirty, newPassword, confirmPassword]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="max-w-lg w-full">
        <form onSubmit={handleSave}>
          <h1 className="text-3xl font-bold text-amber-400 mb-6">Profile & Settings</h1>
          {error && <p className="text-red-400 text-center bg-red-900/50 p-3 rounded-lg mb-4">{error}</p>}
          <div className="space-y-6">
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-slate-300 mb-2">
                Change Nickname
              </label>
              <input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                required
                minLength={3}
              />
            </div>

            <hr className="border-slate-600" />
            
            <div>
              <h2 className="text-lg font-semibold text-slate-200 mb-2">Change Password</h2>
              <div className="space-y-4">
                 <input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password"
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                  />
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm New Password"
                    className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:outline-none focus:ring-2 text-white ${passwordMismatch ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-amber-500'}`}
                  />
                  {passwordMismatch && <p className="text-red-400 text-sm">Passwords do not match.</p>}
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={onBack}
              className="w-full px-6 py-3 bg-slate-600 text-white font-bold rounded-lg hover:bg-slate-500 transition-colors"
            >
              Back to Hub
            </button>
            <button
              type="submit"
              disabled={!canSave}
              className="w-full px-6 py-3 bg-amber-500 text-slate-900 font-bold rounded-lg hover:bg-amber-400 transition-colors disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SettingsView;
