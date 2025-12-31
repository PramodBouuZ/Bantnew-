
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FAQ: React.FC = () => {
  useEffect(() => {
    document.title = "FAQ | BantConfirm B2B Marketplace Help Center";
  }, []);

  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is the BantConfirm philosophy?",
      a: "Our philosophy is built on the belief that every genuine business requirement has value — even when it goes unused. We aim to reduce noise in the B2B market by ensuring every post represents real intent (BANT) and rewarding those who bring such value to the marketplace."
    },
    {
      q: "Can I earn commission by posting requirements?",
      a: "Yes. If you are a sales professional, consultant, or business owner with a verified business requirement that you cannot fulfill, you can post it on BantConfirm. For every successfully closed deal through your referral, you can earn up to 10% commission."
    },
    {
      q: "How is BantConfirm different from a 'lead dump' website?",
      a: "BantConfirm is not a directory or a listing site. Every requirement is structured around BANT (Budget, Authority, Need, Timing). Our AI analyzes intent scores to ensure vendors receive high-conversion opportunities, not just bulk contact lists."
    },
    {
      q: "How does the BANT matching benefit buyers?",
      a: "Buyers save time and money. Instead of juggling multiple mismatched proposals, you post your requirement once. Our system filters for vendors who strictly meet your specific budget, technical need, and timeline, simplifying your selection process."
    },
    {
      q: "Is there a fee for posting an enquiry?",
      a: "No, posting an enquiry as a buyer is completely free. We monetize through vendor success fees and premium services, ensuring our interests are aligned with yours."
    },
    {
      q: "Does BantConfirm sell my data?",
      a: "No. We have a strict 'No Data Selling' policy. Your data is only shared with the specific vendors matched to your requirement through the BANT verification process."
    }
  ];

  return (
    <div className="pt-48 pb-32 px-4 bg-transparent">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <span className="px-4 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-6 inline-block">Help Center</span>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-none mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-slate-500 font-medium">Everything you need to know about the BantConfirm ecosystem.</p>
        </div>

        <div className="space-y-4">
           {faqs.map((faq, idx) => (
             <div 
               key={idx} 
               className={`rounded-[32px] border transition-all duration-300 overflow-hidden ${activeIndex === idx ? 'bg-white border-blue-200 shadow-xl shadow-blue-500/5' : 'bg-white/50 border-slate-100 hover:border-slate-200'}`}
             >
                <button 
                  onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                  className="w-full px-10 py-8 flex items-center justify-between text-left group"
                >
                  <span className={`text-xl font-black transition-colors ${activeIndex === idx ? 'text-blue-600' : 'text-slate-800'}`}>{faq.q}</span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${activeIndex === idx ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-100 text-slate-400'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </button>
                <div className={`transition-all duration-500 ease-in-out ${activeIndex === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                  <div className="px-10 pb-10">
                    <p className="text-slate-600 font-medium leading-relaxed text-lg pt-4 border-t border-slate-50">
                      {faq.a}
                    </p>
                  </div>
                </div>
             </div>
           ))}
        </div>

        <div className="mt-20 p-12 bg-blue-600 rounded-[48px] text-white text-center shadow-2xl shadow-blue-600/20">
           <h3 className="text-2xl font-black mb-4">Ready to unlock business value?</h3>
           <p className="text-blue-100 mb-10 font-medium">Whether you're a buyer, seller, or consultant, BantConfirm is built for you.</p>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/lead-wizard" className="inline-block px-10 py-5 bg-white text-blue-600 rounded-2xl font-black shadow-xl hover:-translate-y-1 transition-all">Post Requirement</Link>
            <Link to="/products" className="inline-block px-10 py-5 bg-blue-700 text-white rounded-2xl font-black shadow-xl hover:-translate-y-1 transition-all">Browse Catalog</Link>
           </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
