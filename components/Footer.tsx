
import React from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {
  socialLinks?: {
    linkedin: string;
    facebook: string;
    twitter: string;
    instagram: string;
  };
  logoText?: string;
  logoColor?: string;
  logoImage?: string;
}

const Footer: React.FC<FooterProps> = ({ 
  socialLinks = { linkedin: '#', facebook: '#', twitter: '#', instagram: '#' },
  logoText = 'BANTConfirm',
  logoColor = '#2563eb',
  logoImage
}) => {
  const footerCategories = [
    { title: "Solutions", links: ["Tally Software", "HRMS Solutions", "Inventory Management", "Billing Software"] },
    { title: "Telecom", links: ["Toll-Free Numbers", "Internet Leased Line", "Networking Security", "AI Voice Agents"] },
    { title: "Near You", links: ["Vendors in Delhi", "IT Mumbai", "CRM Bangalore", "ERP Chennai"] },
    { title: "Company", links: [
      { name: "About Us", path: "/about" },
      { name: "FAQ", path: "/faq" },
      { name: "Blog & Insights", path: "/blog" },
      { name: "Become a Vendor", path: "/vendor-registration" }
    ] }
  ];

  return (
    <footer className="bg-[#020617] text-slate-400 pt-24 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
         {footerCategories.map((group, idx) => (
           <div key={idx}>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-8 border-l-2 border-blue-600 pl-3">{group.title}</h4>
              <ul className="space-y-4">
                 {group.links.map((link, lIdx) => (
                   <li key={lIdx}>
                      {typeof link === 'string' ? (
                        <Link to="/products" className="text-[12px] font-medium text-slate-400 hover:text-blue-400 transition-all duration-300 block">{link}</Link>
                      ) : (
                        <Link to={link.path} className="text-[12px] font-medium text-slate-400 hover:text-blue-400 transition-all duration-300 block">{link.name}</Link>
                      )}
                   </li>
                 ))}
              </ul>
           </div>
         ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 border-t border-white/5 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24 items-center">
          <div className="md:col-span-1">
             <Link to="/" className="h-10 block mb-6">
                {logoImage ? (
                  <img src={logoImage} className="h-full object-contain" alt={logoText} />
                ) : (
                  <h3 className="text-2xl font-black tracking-tighter">
                    <span className="text-blue-600">{logoText.slice(0, 4)}</span><span className="text-yellow-500">{logoText.slice(4)}</span>
                  </h3>
                )}
             </Link>
             <div className="space-y-4">
                <p className="flex items-center gap-4 text-[13px] font-bold text-slate-400">
                   support@bantconfirm.com
                </p>
                <p className="flex items-center gap-4 text-[13px] font-bold text-slate-400">
                   Noida, UP, India
                </p>
             </div>
          </div>

          <div className="flex flex-wrap gap-8 md:col-span-3 md:justify-end">
             <div className="flex gap-4">
                {Object.entries(socialLinks).map(([platform, link]) => (
                  <a key={platform} href={link} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white transition-all uppercase font-black text-[10px]">
                    {platform[0]}
                  </a>
                ))}
             </div>
             <div className="flex gap-8 items-center">
                <Link to="/products" className="text-xs font-black text-slate-500 hover:text-white uppercase tracking-widest">Solutions</Link>
                <Link to="/blog" className="text-xs font-black text-slate-500 hover:text-white uppercase tracking-widest">Insights</Link>
                <Link to="/about" className="text-xs font-black text-slate-500 hover:text-white uppercase tracking-widest">About</Link>
                <Link to="/faq" className="text-xs font-black text-slate-500 hover:text-white uppercase tracking-widest">FAQ</Link>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
