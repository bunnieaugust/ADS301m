
import React, { useState, useEffect } from 'react';
import Card from './Card';
import { User } from '../types';

interface LoginViewProps {
  onLogin: (user: User) => void;
}

type ViewMode = 'login' | 'forgot_nickname' | 'forgot_verify' | 'reset_password';

const USERS_STORAGE_KEY = 'learning_hub_users';

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('login');
  
  // Login/Register state
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [nicknameExists, setNicknameExists] = useState<boolean | null>(null);

  // Forgot Password state
  const [forgotNickname, setForgotNickname] = useState('');
  const [forgotUser, setForgotUser] = useState<User | null>(null);
  const [verifyPhone, setVerifyPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // General state
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Debounced check for nickname existence
    if (viewMode !== 'login' || !nickname.trim()) {
      setNicknameExists(null);
      return;
    }
    const handler = setTimeout(() => {
      const allUsers: User[] = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
      const exists = allUsers.some(u => u.nickname.toLowerCase() === nickname.trim().toLowerCase());
      setNicknameExists(exists);
    }, 300);

    return () => clearTimeout(handler);
  }, [nickname, viewMode]);

  const resetForm = () => {
    setNickname(''); setPassword(''); setPhone(''); setForgotNickname(''); setVerifyPhone('');
    setNewPassword(''); setConfirmNewPassword(''); setError(null); setSuccess(null);
    setIsSubmitting(false); setForgotUser(null);
  };

  const handleBackToLogin = () => {
    resetForm();
    setViewMode('login');
  };

  const handleSubmitLoginRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim() || !password.trim()) {
      setError("Nickname and password cannot be empty.");
      return;
    }
    setError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      try {
        const allUsers: User[] = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
        const existingUser = allUsers.find(u => u.nickname.toLowerCase() === nickname.trim().toLowerCase());
  
        if (existingUser) { // Login
          if (existingUser.password === password) {
            onLogin(existingUser);
          } else {
            setError("Incorrect password. Please try again.");
            setIsSubmitting(false);
          }
        } else { // Register
          const newUser: User = {
            id: `user_${nickname.trim()}_${Date.now()}`,
            nickname: nickname.trim(),
            password: password,
            phone: phone.trim() || undefined,
          };
          const updatedUsers = [...allUsers, newUser];
          localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
          onLogin(newUser);
        }
      } catch (e) {
        console.error("Failed to process login:", e);
        setError("An unexpected error occurred. Please try again.");
        setIsSubmitting(false);
      }
    }, 500);
  };

  const handleForgotNicknameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allUsers: User[] = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    const userFound = allUsers.find(u => u.nickname.toLowerCase() === forgotNickname.trim().toLowerCase());
    
    if (userFound) {
      if (!userFound.phone) {
        setError("This account does not have a phone number registered for recovery.");
        return;
      }
      setForgotUser(userFound);
      setError(null);
      setViewMode('forgot_verify');
    } else {
      setError("Nickname not found.");
    }
  };

  const handleVerifyPhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (forgotUser && forgotUser.phone === verifyPhone.trim()) {
      setError(null);
      setViewMode('reset_password');
    } else {
      setError("Phone number does not match. Please try again.");
    }
  };

  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 4) {
      setError("Password must be at least 4 characters long.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match.");
      return;
    }

    const allUsers: User[] = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    const updatedUsers = allUsers.map(u => 
      u.id === forgotUser?.id ? { ...u, password: newPassword } : u
    );
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    
    setSuccess("Password has been reset successfully! Please log in.");
    handleBackToLogin();
  };

  const renderLoginRegister = () => (
    <Card>
      <form onSubmit={handleSubmitLoginRegister} className="space-y-6">
        {error && <p className="text-red-400 text-center bg-red-900/50 p-3 rounded-lg border border-red-800">{error}</p>}
        {success && <p className="text-green-400 text-center bg-green-900/50 p-3 rounded-lg border border-green-800">{success}</p>}
        <div>
          <label htmlFor="nickname" className="sr-only">Nickname</label>
          <input id="nickname" type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="Enter your nickname" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white" required/>
        </div>
        {nicknameExists === false && nickname.trim() && (
            <div className="animate-fade-in">
              <label htmlFor="phone" className="sr-only">Phone Number (Optional)</label>
              <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number (for recovery)" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"/>
            </div>
        )}
        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white" required/>
        </div>
        <button type="submit" className="w-full px-8 py-3 bg-amber-500 text-slate-900 font-bold rounded-lg hover:bg-amber-400 transition-colors duration-300 shadow-lg text-lg disabled:bg-slate-600 disabled:cursor-not-allowed" disabled={isSubmitting || !nickname.trim() || !password.trim()}>
          {isSubmitting ? 'Processing...' : (nicknameExists ? 'Login' : 'Register')}
        </button>
        <div className="text-center pt-2">
            <button type="button" onClick={() => { resetForm(); setViewMode('forgot_nickname'); }} className="text-sm text-amber-400 hover:underline">
                Forgot Password?
            </button>
        </div>
      </form>
    </Card>
  );

  const renderForgotNickname = () => (
    <Card>
      <form onSubmit={handleForgotNicknameSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-center text-amber-400">Find Your Account</h2>
        {error && <p className="text-red-400 text-center">{error}</p>}
        <div>
          <label htmlFor="forgot-nickname" className="sr-only">Nickname</label>
          <input id="forgot-nickname" type="text" value={forgotNickname} onChange={(e) => setForgotNickname(e.target.value)} placeholder="Enter your nickname" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg" required />
        </div>
        <div className="flex gap-4">
            <button type="button" onClick={handleBackToLogin} className="w-full py-3 bg-slate-600 rounded-lg hover:bg-slate-500 transition-colors">Back to Login</button>
            <button type="submit" className="w-full py-3 bg-amber-500 text-slate-900 font-bold rounded-lg hover:bg-amber-400 transition-colors">Find</button>
        </div>
      </form>
    </Card>
  );

  const renderForgotVerify = () => (
    <Card>
      <form onSubmit={handleVerifyPhoneSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-center text-amber-400">Verify Your Identity</h2>
        <p className="text-center text-slate-300">Enter the phone number associated with the nickname <span className="font-bold text-white">{forgotUser?.nickname}</span>.</p>
        {error && <p className="text-red-400 text-center">{error}</p>}
        <div>
          <label htmlFor="verify-phone" className="sr-only">Phone Number</label>
          <input id="verify-phone" type="tel" value={verifyPhone} onChange={(e) => setVerifyPhone(e.target.value)} placeholder="Enter your phone number" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg" required />
        </div>
        <div className="flex gap-4">
            <button type="button" onClick={handleBackToLogin} className="w-full py-3 bg-slate-600 rounded-lg hover:bg-slate-500 transition-colors">Back to Login</button>
            <button type="submit" className="w-full py-3 bg-amber-500 text-slate-900 font-bold rounded-lg hover:bg-amber-400 transition-colors">Verify</button>
        </div>
      </form>
    </Card>
  );

  const renderResetPassword = () => (
    <Card>
      <form onSubmit={handleResetPasswordSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-center text-amber-400">Reset Your Password</h2>
        {error && <p className="text-red-400 text-center">{error}</p>}
        <div>
          <label htmlFor="new-password" className="sr-only">New Password</label>
          <input id="new-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg" required />
        </div>
        <div>
          <label htmlFor="confirm-new-password" className="sr-only">Confirm New Password</label>
          <input id="confirm-new-password" type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} placeholder="Confirm new password" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg" required />
        </div>
        <button type="submit" className="w-full py-3 bg-amber-500 text-slate-900 font-bold rounded-lg hover:bg-amber-400 transition-colors">Reset Password</button>
      </form>
    </Card>
  );


  const renderContent = () => {
    switch(viewMode) {
        case 'login': return renderLoginRegister();
        case 'forgot_nickname': return renderForgotNickname();
        case 'forgot_verify': return renderForgotVerify();
        case 'reset_password': return renderResetPassword();
        default: return renderLoginRegister();
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-900">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-amber-400">Learning Hub</h1>
            <p className="text-slate-300 mt-2">
                {viewMode === 'login' ? 'Sign in or create an account to continue.' : 'Password Recovery'}
            </p>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default LoginView;
