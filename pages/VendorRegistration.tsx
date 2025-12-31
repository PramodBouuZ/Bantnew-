
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const VendorRegistration: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    mobile: '',
    email: '',
    location: '',
    category: 'SOFTWARE',
    productExpertise: '',
    customBox: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Become a Partner Vendor | BANTConfirm Marketplace";
    const savedCats = localStorage.getItem('marketplaceCategories');
    if (savedCats) {
      setCategories(JSON.parse(savedCats));
    } else {
      setCategories(['Software', 'Telecom', 'Marketing', 'IT Hardware']);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const savedVendors = JSON.parse(localStorage.getItem('marketplaceVendors') || '[]');
      const newVendor = {
        ...formData,
        id: Date.now().toString(),
        verified: false,
        dateJoined: new Date().toLocaleDateString()
      };
      
      localStorage.setItem('marketplaceVendors', JSON.stringify([newVendor, ...savedVendors]));
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="pt-48 pb-40 px-4 min-h-screen bg-[#f8fafc]">
        <div className="max-w-2xl mx-auto text-center animate-in zoom-in-95 duration-500">
          <div className="w-24 h-24 bg-emerald-500 rounded-[32px] flex items-center justify-center text-white mx-auto mb-8 shadow-2xl shadow-emerald-500/20">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-6">Application Received!</h1>
          <p className="text-slate-600 text-lg font-medium leading-relaxed mb-12">
            Thank you for your interest in joining the BANTConfirm partner ecosystem. Our vendor relations team will review your company profile and expertise details. You will hear from us within 48 business hours regarding the next steps and verification audit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('/')} className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black shadow-xl hover:bg-blue-700 transition-all">Back to Home</button>
            <Link to="/faq" className="px-10 py-5 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black hover:bg-slate-50 transition-all">Vendor FAQ</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-48 pb-32 px-4 bg-[#f8fafc] relative overflow-hidden">
      {/* Decorative Blobs for this page */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="px-4 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-6 inline-block">Partner Ecosystem</span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none mb-6">
            Join India's Fastest Growing <br/> <span className="text-blue-600">B2B Vendor Network</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Stop chasing cold leads. Get matched with high-intent requirements verified through our BANT methodology.
          </p>
        </div>

        <div className="bg-white rounded-[56px] p-8 md:p-16 shadow-2xl shadow-blue-900/5 border border-white">
          <h2 className="text-2xl font-black text-slate-900 mb-10">Vendor Registration Form</h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Contact Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-slate-700 outline-none focus:border-blue-400 transition-all" 
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Company Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-slate-700 outline-none focus:border-blue-400 transition-all" 
                  placeholder="e.g. Nexus Software Solutions"
                  value={formData.companyName}
                  onChange={e => setFormData({...formData, companyName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Business Email</label>
                <input 
                  type="email" 
                  required
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-slate-700 outline-none focus:border-blue-400 transition-all" 
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Mobile Number</label>
                <input 
                  type="tel" 
                  required
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-slate-700 outline-none focus:border-blue-400 transition-all" 
                  placeholder="+91 98XXX XXXXX"
                  value={formData.mobile}
                  onChange={e => setFormData({...formData, mobile: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Primary Category</label>
                <select 
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-slate-700 outline-none appearance-none"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  {categories.map(cat => <option key={cat} value={cat.toUpperCase()}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Operating Location</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-slate-700 outline-none focus:border-blue-400 transition-all" 
                  placeholder="e.g. Bangalore, KA"
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Product Expertise (Comma separated)</label>
              <input 
                type="text" 
                required
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-slate-700 outline-none focus:border-blue-400 transition-all" 
                placeholder="e.g. Tally Cloud, Zoho CRM, Firewall Security"
                value={formData.productExpertise}
                onChange={e => setFormData({...formData, productExpertise: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Brief Description / Remarks</label>
              <textarea 
                rows={4}
                className="w-full px-8 py-6 rounded-[32px] bg-slate-50 border border-slate-200 font-bold text-slate-700 outline-none focus:border-blue-400 transition-all resize-none" 
                placeholder="Tell us about your company and top client successes..."
                value={formData.customBox}
                onChange={e => setFormData({...formData, customBox: e.target.value})}
              />
            </div>

            <div className="bg-blue-50/50 rounded-3xl p-6 border border-blue-100 mb-4">
              <p className="text-[11px] font-bold text-blue-600 leading-relaxed uppercase tracking-widest">
                By submitting, you agree to our vendor verification process and data handling policies.
              </p>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-6 bg-blue-600 text-white rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  PROCESSING APPLICATION...
                </div>
              ) : 'SUBMIT VENDOR PROFILE'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VendorRegistration;
