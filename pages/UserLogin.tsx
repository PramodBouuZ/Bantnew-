
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    setTimeout(() => {
      const normalizedEmail = email.toLowerCase().trim();
      
      // Admin credentials as requested: info.bouuz@gmail.com
      if (normalizedEmail === 'info.bouuz@gmail.com' && password === 'AdminAccess2025') {
        sessionStorage.setItem('isAdmin', 'true');
        setIsLoading(false);
        navigate('/admin');
        return;
      }

      const users = JSON.parse(localStorage.getItem('marketplaceUsers') || '[]');
      const user = users.find((u: any) => u.email.toLowerCase() === normalizedEmail && u.password === password);
      
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        setIsLoading(false);
        navigate('/');
      } else {
        setError('Invalid email or password.');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="pt-32 pb-40 px-4 min-h-screen bg-[#fcfdff] relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-full h-full -z-10 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-400/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-md mx-auto relative">
        {/* Professional Back Button (matches screenshot) */}
        <button 
          onClick={() => navigate(-1)} 
          className="absolute -top-12 md:-top-16 -left-4 md:-left-12 p-3 text-blue-600 hover:scale-110 transition-all group flex items-center"
          aria-label="Go back"
        >
          <svg className="w-8 h-8 md:w-10 md:h-10 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="bg-white p-8 md:p-12 rounded-[56px] border border-slate-100 shadow-2xl shadow-indigo-500/5 animate-in fade-in zoom-in-95 duration-500">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-blue-600 rounded-3xl mx-auto flex items-center justify-center text-white shadow-xl mb-6 shadow-blue-600/20">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h1>
            <p className="text-slate-500 font-medium text-sm mt-2">Log in to manage your requirements</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 text-red-600 text-[11px] font-black rounded-2xl border border-red-100 animate-in shake duration-300">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1 px-1">Email Address</label>
              <input 
                type="email" 
                required 
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none font-bold text-slate-700 focus:border-blue-500 focus:bg-white transition-all shadow-sm" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="john@example.com" 
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Password</label>
                <Link to="#" className="text-[10px] font-bold text-blue-600 hover:underline">Forgot?</Link>
              </div>
              <input 
                type="password" 
                required 
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none font-bold text-slate-700 focus:border-blue-500 focus:bg-white transition-all shadow-sm" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="••••••••" 
              />
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading} 
              className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all text-sm uppercase tracking-[0.2em] active:scale-[0.98] disabled:opacity-50 mt-4"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Authenticating
                </div>
              ) : 'SIGN IN'}
            </button>
          </form>
          
          <div className="mt-10 pt-8 border-t border-slate-50 text-center">
            <p className="text-slate-500 text-xs font-medium">
              Don't have an account? <Link to="/user-signup" className="text-blue-600 font-black hover:underline ml-1">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
