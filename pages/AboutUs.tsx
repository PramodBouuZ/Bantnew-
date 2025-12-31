
import React, { useEffect } from 'react';

const AboutUs: React.FC = () => {
  useEffect(() => {
    document.title = "About Us | BantConfirm – India's Smartest B2B Marketplace";
  }, []);

  return (
    <div className="pt-48 pb-32 px-4 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="px-4 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-6 inline-block">Our Mission & Philosophy</span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-none mb-8">
            Every business requirement <br className="hidden md:block"/> 
            <span className="text-blue-600">has value.</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-4xl mx-auto font-medium leading-relaxed">
            BantConfirm is built on a simple but powerful belief: <span className="text-slate-900 font-bold">Every genuine business requirement has value — even when it goes unused.</span> We are a B2B AI-driven marketplace where the entire ecosystem — from buyers to referrers — is rewarded for real business intent.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="relative">
            <div className="aspect-square rounded-[64px] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" 
                alt="Our Team" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-amber-400 rounded-[48px] p-10 flex flex-col justify-center shadow-2xl hidden md:flex">
               <p className="text-4xl font-black text-slate-900 mb-2">10%</p>
               <p className="text-xs font-black uppercase tracking-widest text-slate-800">Referrer Commission on Closed Deals</p>
            </div>
          </div>
          <div className="space-y-10">
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Trust-First B2B Marketplace</h2>
              <p className="text-lg text-slate-600 font-medium leading-relaxed">
                BantConfirm is not a listing website. It is not a lead dump. It is a trust-first ecosystem designed to reduce noise, increase conversion, and reward real business value.
              </p>
            </div>
            <div className="space-y-6">
               <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900">For Buyers</h3>
                    <p className="text-sm text-slate-500 font-medium">Simplified procurement. Just post once. Our BANT-focused system matches you with the right vendors within your budget and timeline.</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <div className="w-12 h-12 bg-amber-400 rounded-2xl flex items-center justify-center text-slate-900 shadow-lg flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900">For Sales Pros & Consultants</h3>
                    <p className="text-sm text-slate-500 font-medium">Transform unused or unconverted leads into economic opportunity. Earn up to 10% commission on verified closures.</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900">For Sellers & Vendors</h3>
                    <p className="text-sm text-slate-500 font-medium">No cold leads. Only intent-driven opportunities structured around serious buying BANT criteria.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="bg-[#0f172a] rounded-[64px] p-12 md:p-20 text-white text-center">
           <h2 className="text-4xl md:text-5xl font-black mb-12 tracking-tight">Our Commitment</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              <div>
                <h4 className="text-xl font-bold mb-4 text-blue-400">One Requirement</h4>
                <p className="text-slate-400 text-sm font-medium">Post once, reach the entire verified market instantly.</p>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-4 text-amber-400">One Platform</h4>
                <p className="text-slate-400 text-sm font-medium">A single point of trust for all IT and software procurement.</p>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-4 text-emerald-400">Right Timing</h4>
                <p className="text-slate-400 text-sm font-medium">BANT-driven AI ensures matches happen only when intent is real.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
