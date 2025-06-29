import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle, ArrowRight, Shield, User, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SignUpForm from './SignUpForm';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(email, password);
    if (!success) {
      setError('Email atau kata sandi tidak valid');
    }
  };

  const demoAccounts = [
    { 
      email: 'admin@para.com', 
      password: 'admin123', 
      role: 'Administrator', 
      color: 'bg-gradient-to-r from-red-500 to-pink-500',
      icon: Shield,
      description: 'Akses penuh sistem & manajemen'
    },
    { 
      email: 'john.doe@para.com', 
      password: 'employee123', 
      role: 'Karyawan', 
      color: 'bg-gradient-to-r from-blue-500 to-purple-500',
      icon: User,
      description: 'Manajemen absensi & cuti personal'
    }
  ];

  if (showSignUp) {
    return <SignUpForm onBack={() => setShowSignUp(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400/20 to-purple-600/20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img 
                  src="/public/Logo_PIS-removebg-preview.png" 
                  alt="PARA Logo" 
                  className="w-16 h-16"
                />
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-20 blur-lg"></div>
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Selamat Datang di PARA
            </h1>
            <p className="text-gray-600 mt-2">Sistem Manajemen Absensi Cerdas</p>
          </div>

          {/* Demo Accounts */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Akun Demo
            </h3>
            <div className="space-y-3">
              {demoAccounts.map((account, index) => {
                const Icon = account.icon;
                return (
                  <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 ${account.color} rounded-xl flex items-center justify-center shadow-lg`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-800">{account.role}</div>
                            <div className="text-xs text-gray-500">{account.description}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setEmail(account.email);
                            setPassword(account.password);
                          }}
                          className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-medium rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-sm"
                        >
                          Gunakan
                        </button>
                      </div>
                      <div className="text-xs text-gray-600 bg-gray-50 rounded-lg p-2">
                        <div><strong>Email:</strong> {account.email}</div>
                        <div><strong>Kata Sandi:</strong> {account.password}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Alamat Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                placeholder="Masukkan email Anda"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white pr-12"
                  placeholder="Masukkan kata sandi Anda"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center justify-center group"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Masuk...
                </>
              ) : (
                <>
                  Masuk
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Belum punya akun?{' '}
              <button
                onClick={() => setShowSignUp(true)}
                className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
              >
                Daftar di sini
              </button>
            </p>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Didukung oleh PARA • Aman & Terpercaya
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;