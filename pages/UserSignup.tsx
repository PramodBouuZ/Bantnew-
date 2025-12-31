
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserSignup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    mobile: '',
    email: '',
    location: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('marketplaceUsers') || '[]');
      users.push(formData);
      localStorage.setItem('marketplaceUsers', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(formData));
      
      setIsLoading(false);
      navigate('/');
      window.dispatchEvent(new Event('storage'));
    }, 800);
  };

  const handleGoogleSignup = () => {
    setIsLoading(true);
    setTimeout(() => {
      const googleUser = {
        name: 'Google User',
        email: 'google.user@example.com',
        mobile: '9999999999',
        companyName: 'Google Workspace User',
        location: 'Mountain View',
        isGoogle: true
      };
      localStorage.setItem('currentUser', JSON.stringify(googleUser));
      setIsLoading(false);
      navigate('/');
      window.dispatchEvent(new Event('storage'));
    }, 1200);
  };

  return (
    <div className="pt-40 pb-40 px-4 min-h-screen bg-[#fcfdff] flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="bg-white p-8 md:p-12 rounded-[48px] border border-slate-100 shadow-2xl shadow-indigo-500/5">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-blue-600 rounded-3xl mx-auto flex items-center justify-center text-white shadow-xl mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create Account</h1>
            <p className="text-slate-500 font-medium text-sm mt-2">Join India's smartest B2B marketplace</p>
          </div>

          <div className="space-y-4 mb-8">
            <button 
              onClick={handleGoogleSignup}
              className="w-full py-4 border border-slate-200 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 transition-all group active:scale-[0.98]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-slate-700 font-bold text-sm">Sign up with Google</span>
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-slate-400 font-black tracking-widest">Or use your Email</span></div>
          </div>
          
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Full Name</label>
              <input type="text" required className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none font-bold focus:border-blue-500" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Company Name</label>
              <input type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none font-bold focus:border-blue-500" value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} placeholder="Acme Corp" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Mobile</label>
                <input type="tel" required className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none font-bold focus:border-blue-500" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} placeholder="9876543210" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Location</label>
                <input type="text" required className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none font-bold focus:border-blue-500" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="Delhi" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Email Address</label>
              <input type="email" required className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none font-bold focus:border-blue-500" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Password</label>
              <input type="password" required className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none font-bold focus:border-blue-500" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} placeholder="••••••••" />
            </div>
            
            <button type="submit" disabled={isLoading} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all text-sm uppercase tracking-widest mt-4">
              {isLoading ? 'Creating Account...' : 'Sign Up Now'}
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-xs font-medium">Already have an account? <Link to="/user-login" className="text-blue-600 font-bold hover:underline">Log in</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
