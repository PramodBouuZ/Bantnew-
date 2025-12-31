
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { geminiService } from '../services/geminiService';

const LeadWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    location: '',
    companyName: '',
    industry: '',
    budget: '',
    authority: 'Not Provided',
    need: '',
    timeline: 'Not Provided'
  });
  
  const [analysis, setAnalysis] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const u = JSON.parse(savedUser);
      setUser(u);
      setFormData(prev => ({
        ...prev,
        name: u.name,
        email: u.email,
        mobile: u.mobile,
        companyName: u.companyName,
        location: u.location
      }));
    }
  }, []);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    if (!formData.need || !formData.name || !formData.email || !formData.mobile) {
        alert("Please provide your contact details and requirement summary.");
        setStep(1);
        return;
    }

    setLoading(true);
    const result = await geminiService.analyzeBantIntent(formData);
    setAnalysis(result);
    
    const savedLeads = JSON.parse(localStorage.getItem('marketplaceLeads') || '[]');
    const newLead = {
      id: Date.now().toString(),
      contactName: formData.name,
      companyName: formData.companyName || 'Individual / MSME',
      location: formData.location || 'Pan-India',
      mobile: formData.mobile,
      email: formData.email,
      requirement: formData.need,
      budget: formData.budget || 'Not Specified',
      authority: formData.authority || 'Not Specified',
      need: formData.need,
      timeline: formData.timeline || 'Not Specified',
      date: new Date().toLocaleString('en-IN'),
      status: result.bantStatus === 'qualified' ? 'Qualified' : 'Pending',
      remarks: result.summary,
      assignedVendorId: '',
      intentScore: result.intentScore || 50
    };
    
    localStorage.setItem('marketplaceLeads', JSON.stringify([newLead, ...savedLeads]));
    setLoading(false);
    setStep(4);
  };

  return (
    <div className="pt-48 pb-20 px-4 min-h-screen bg-[#f8fafc]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="px-4 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-4 inline-block">AI Sourcing Intelligence</span>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter leading-tight">Post Your B2B Requirement</h1>
          <p className="text-slate-500 font-medium">Verified intent analysis powered by BANT methodology.</p>
        </div>

        {/* Stepper */}
        <div className="flex justify-between items-center mb-12 max-w-sm mx-auto">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all ${step >= i ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-slate-200 text-slate-400'}`}>
                {i}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-slate-100 relative overflow-hidden">
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-2">
              <h2 className="text-2xl font-black text-slate-800 mb-8">Verification Details</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Lead Contact Name</label>
                    <input type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-slate-700 outline-none focus:border-indigo-400" placeholder="Rahul Sharma" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Business Email</label>
                    <input type="email" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-slate-700 outline-none focus:border-indigo-400" placeholder="rahul@company.in" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Mobile Contact</label>
                    <input type="tel" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-slate-700 outline-none focus:border-indigo-400" placeholder="91XXXXXXXX" value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value})} />
                    </div>
                    <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Operating Location</label>
                    <input type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-slate-700 outline-none focus:border-indigo-400" placeholder="Noida, UP" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                    </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Company / Organization</label>
                  <input type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none font-bold text-slate-700 focus:border-indigo-400" placeholder="e.g. Acme Tech" value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})} />
                </div>
              </div>
              <button onClick={nextStep} className="mt-10 w-full py-5 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-600/30 hover:-translate-y-1 transition-all">Next: Requirement Specs</button>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-2">
              <h2 className="text-2xl font-black text-slate-800 mb-8">BANT Analysis Parameters</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Describe the Exact Solution Required</label>
                  <textarea rows={4} className="w-full px-6 py-4 rounded-3xl bg-slate-50 border border-slate-200 font-bold text-slate-700 outline-none resize-none focus:border-indigo-400" placeholder="e.g. I need cloud-based HRMS for 200 employees with biometrics sync." value={formData.need} onChange={(e) => setFormData({...formData, need: e.target.value})} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Estimated Budget (Optional)</label>
                    <input type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-slate-700 outline-none" placeholder="e.g. 2-5 Lakhs" value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})} />
                    </div>
                    <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Decision Authority</label>
                    <select className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-slate-700 outline-none" value={formData.authority} onChange={(e) => setFormData({...formData, authority: e.target.value})}>
                        <option value="Not Provided">Select Role</option>
                        <option value="Decider">Final Decision Maker</option>
                        <option value="Evaluator">Technical Evaluator</option>
                        <option value="Researcher">Researcher / Manager</option>
                    </select>
                    </div>
                </div>
              </div>
              <div className="flex gap-4 mt-10">
                <button onClick={prevStep} className="flex-1 py-5 border border-slate-200 rounded-2xl font-black text-slate-500 hover:bg-slate-50 transition-all">Back</button>
                <button onClick={nextStep} className="flex-[2] py-5 bg-indigo-600 text-white rounded-2xl font-black shadow-xl">Finalize</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-2">
              <h2 className="text-2xl font-black text-slate-800 mb-8">Final Sourcing Context</h2>
              <div className="space-y-8">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-1">Implementation Timeline</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Immediate', '1 Month', '1-3 Months', 'Exploring'].map(time => (
                      <button key={time} onClick={() => setFormData({...formData, timeline: time})} className={`py-4 rounded-2xl border-2 transition-all font-black text-[10px] uppercase tracking-widest ${formData.timeline === time ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-md' : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'}`}>{time}</button>
                    ))}
                  </div>
                </div>
                <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xs">✓</div>
                    <p className="text-[11px] font-bold text-blue-600 leading-relaxed">Our AI will audit your requirement against BANT criteria and match you with the Top 3 audited vendors in our ecosystem.</p>
                </div>
              </div>
              <div className="flex gap-4 mt-10">
                <button onClick={prevStep} className="flex-1 py-5 border border-slate-200 rounded-2xl font-black text-slate-500 hover:bg-slate-50 transition-all">Back</button>
                <button onClick={handleSubmit} disabled={loading} className="flex-[2] py-5 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-3 transition-all hover:-translate-y-1">
                    {loading ? <><span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span> ANALYZING INTENT...</> : 'CONFIRM REQUIREMENT'}
                </button>
              </div>
            </div>
          )}

          {step === 4 && analysis && (
            <div className="animate-in zoom-in-95 duration-500 text-center">
              <div className="w-24 h-24 bg-emerald-500 rounded-[32px] flex items-center justify-center text-white mx-auto mb-8 shadow-2xl shadow-emerald-500/20">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Sourcing Record Created</h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-10">Intent Verification Score: {analysis.intentScore}/100</p>
              <div className="text-left bg-slate-50 p-8 rounded-[40px] border border-slate-100 mb-10">
                <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4 border-b border-slate-200 pb-2">Admin/AI Audit Summary</h4>
                <p className="text-slate-600 font-medium leading-relaxed italic">"{analysis.summary}"</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products" className="flex-1 py-5 bg-indigo-600 text-white rounded-2xl font-black shadow-xl flex items-center justify-center hover:-translate-y-1 transition-all uppercase text-[10px] tracking-widest">Browse Alternatives</Link>
                <button onClick={() => navigate('/')} className="flex-1 py-5 bg-white border border-slate-200 rounded-2xl font-black text-slate-500 hover:bg-slate-50 transition-all uppercase text-[10px] tracking-widest">Back to Dashboard</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadWizard;
