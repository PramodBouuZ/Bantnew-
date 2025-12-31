
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
    
    // In a real app, this would be an API call
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('marketplaceUsers') || '[]');
      users.push(formData);
      localStorage.setItem('marketplaceUsers', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(formData));
      
      setIsLoading(false);
      navigate('/');
    }, 800);
  };

  return (
    <div className="pt-48 pb-40 px-4 min-h-screen bg-[#fcfdff]">
      <div className="max-w-md mx-auto">
        <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-2xl shadow-indigo-500/5">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-blue-600 rounded-3xl mx-auto flex items-center justify-center text-white shadow-xl mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create Account</h1>
            <p className="text-slate-500 font-medium text-sm mt-2">Join India's smartest B2B marketplace</p>
          </div>
          
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Full Name</label>
              <input type="text" required className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none font-bold focus:border-blue-500" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Company Name (Optional)</label>
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
