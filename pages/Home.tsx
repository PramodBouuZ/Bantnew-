
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS as initialProducts } from '../constants';
import JsonLd from '../components/JsonLd';
import { VendorLogo, Product } from '../types';

const Home: React.FC = () => {
  const [vendorLogos, setVendorLogos] = useState<VendorLogo[]>([]);
  const [activeCategory, setActiveCategory] = useState('All Solutions');
  const [searchQuery, setSearchQuery] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);

  useEffect(() => {
    document.title = "BantConfirm - India's Smartest B2B AI Marketplace";

    const savedLogos = localStorage.getItem('marketplaceVendorLogos');
    if (savedLogos) {
      setVendorLogos(JSON.parse(savedLogos));
    } else {
      const defaults: VendorLogo[] = [
        { id: 'd1', name: 'Microsoft', image: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
        { id: 'd2', name: 'Tally', image: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Tally_Solutions_Logo.svg' },
        { id: 'd3', name: 'Airtel', image: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Airtel_logo.svg' },
        { id: 'd4', name: 'Zoho', image: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Zoho_Corporation_logo.svg' },
        { id: 'd5', name: 'Jio', image: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Reliance_Jio_Logo.svg' },
        { id: 'd6', name: 'AWS', image: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' }
      ];
      setVendorLogos(defaults);
      localStorage.setItem('marketplaceVendorLogos', JSON.stringify(defaults));
    }

    const savedProducts = localStorage.getItem('marketplaceProducts');
    if (savedProducts) {
      setAllProducts(JSON.parse(savedProducts));
    } else {
      setAllProducts(initialProducts);
      localStorage.setItem('marketplaceProducts', JSON.stringify(initialProducts));
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('reveal-visible');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let filtered = allProducts;
    if (activeCategory !== 'All Solutions') {
      filtered = filtered.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
    }
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setDisplayProducts(filtered.slice(0, 4));
  }, [activeCategory, searchQuery, allProducts]);

  return (
    <div className="pt-32 overflow-hidden bg-transparent text-slate-900">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", "name": "BantConfirm", "url": "https://bantconfirm.com" }} />
      
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="reveal inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-50 mb-12 shadow-sm border border-blue-100">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-blue-700">AI-Driven B2B Procurement</span>
          </div>
          
          <h1 className="text-4xl md:text-[80px] font-black text-[#1e293b] tracking-tighter leading-[1.05] mb-10 reveal">
            The <span className="inline-flex items-center justify-center px-6 py-2 bg-blue-600 text-white rounded-2xl mx-2 shadow-xl shadow-blue-600/20 translate-y-[-4px]">IT</span> Marketplace for <br/>
            <span className="text-[#f59e0b]">MSMEs</span> <span className="text-slate-900">&</span> <span className="text-[#10b981]">Enterprises</span>
          </h1>
          
          <p className="reveal reveal-delay-2 text-blue-600 text-2xl md:text-3xl font-extrabold mb-10 tracking-tight">
            Software, IT Hardware & Services
          </p>
          
          <p className="reveal reveal-delay-3 text-lg md:text-xl text-slate-500 mb-14 max-w-4xl mx-auto font-semibold leading-relaxed">
            Discover, Compare, and Buy Enterprise-grade IT Solutions. We connect Indian businesses with verified top-tier vendors using AI-driven BANT matching.
          </p>
          
          <div className="reveal reveal-delay-4 flex flex-col items-center justify-center gap-6 mb-24 max-w-md mx-auto">
            <Link to="/products" className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all text-base uppercase tracking-widest active:scale-95">
              Explore Solutions
            </Link>
            <Link to="/lead-wizard" className="w-full py-5 bg-white border border-slate-200 text-slate-700 rounded-2xl font-black hover:bg-slate-50 transition-all shadow-sm text-base uppercase tracking-widest active:scale-95">
              Post My Requirement
            </Link>
          </div>
        </div>

        {/* Vendor Logo Marquee */}
        <div className="reveal reveal-delay-5 py-16 relative overflow-hidden border-y border-slate-100 bg-white/40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 mb-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 text-center">Empowering Businesses with Global Partners</h4>
          </div>
          <div className="flex relative w-full overflow-hidden">
            <div className="flex animate-marquee space-x-16 md:space-x-32 whitespace-nowrap py-4 items-center">
              {[...vendorLogos, ...vendorLogos, ...vendorLogos].map((logo, idx) => (
                <div key={`${logo.id}-${idx}`} className="flex-shrink-0 w-32 md:w-40 flex items-center justify-center filter grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                  <img src={logo.image} alt={logo.name} className="max-h-12 max-w-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why BantConfirm? Section */}
      <section className="py-24 px-4 bg-white/50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="reveal text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-[#1e293b] tracking-tighter mb-4">Why BantConfirm?</h2>
            <h3 className="text-xl md:text-2xl font-extrabold text-blue-600 mb-6 uppercase tracking-widest">India's Smartest IT Procurement Hub</h3>
            <p className="text-slate-800 text-lg md:text-2xl font-black max-w-4xl mx-auto leading-relaxed mb-6">
              No data selling. No fake leads. Only AI-verified requirements and trusted partners.
            </p>
            <div className="max-w-4xl mx-auto bg-blue-50/50 p-8 rounded-[40px] border border-blue-100/50">
               <p className="text-slate-600 text-lg font-bold leading-relaxed">
                 <span className="text-blue-600 font-black">Philosophy:</span> BantConfirm is built on a simple but powerful belief: <span className="text-slate-900">Every genuine business requirement has value — even when it goes unused.</span> We are a B2B AI-driven marketplace where the entire ecosystem — from buyers to referrers — is rewarded for real business intent.
               </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="reveal reveal-delay-1 bg-white p-10 rounded-[48px] border border-slate-50 shadow-xl shadow-slate-200/40 hover:-translate-y-2 transition-all duration-500 flex flex-col group">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-[24px] flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">⚡</div>
              <h4 className="text-2xl font-black text-[#1e293b] mb-4 leading-tight">AI-Qualified Requirements</h4>
              <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-grow">
                Our BANT methodology ensures you connect with high-intent leads who have validated Budget, Authority, Need, and Timing.
              </p>
              <Link to="/about" className="text-blue-600 font-black uppercase text-xs tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                Learn more <span>→</span>
              </Link>
            </div>

            {/* Card 2 */}
            <div className="reveal reveal-delay-2 bg-white p-10 rounded-[48px] border border-slate-50 shadow-xl shadow-slate-200/40 hover:-translate-y-2 transition-all duration-500 flex flex-col group">
              <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-[24px] flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">🏢</div>
              <h4 className="text-2xl font-black text-[#1e293b] mb-4 leading-tight">Verified Vendor Network</h4>
              <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-grow">
                Find verified software developers, IT hardware suppliers, and cloud telephony providers across India.
              </p>
              <Link to="/vendor-registration" className="text-amber-600 font-black uppercase text-xs tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                Learn more <span>→</span>
              </Link>
            </div>

            {/* Card 3 */}
            <div className="reveal reveal-delay-3 bg-white p-10 rounded-[48px] border border-slate-50 shadow-xl shadow-slate-200/40 hover:-translate-y-2 transition-all duration-500 flex flex-col group">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-[24px] flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">🔑</div>
              <h4 className="text-2xl font-black text-[#1e293b] mb-4 leading-tight">Enterprise Licensing</h4>
              <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-grow">
                Get best quotes for Microsoft 365, Windows Server, SQL Server, and custom enterprise licenses.
              </p>
              <Link to="/products" className="text-emerald-600 font-black uppercase text-xs tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                Learn more <span>→</span>
              </Link>
            </div>

            {/* Card 4 */}
            <div className="reveal reveal-delay-4 bg-white p-10 rounded-[48px] border border-slate-50 shadow-xl shadow-slate-200/40 hover:-translate-y-2 transition-all duration-500 flex flex-col group">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-[24px] flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">🛠️</div>
              <h4 className="text-2xl font-black text-[#1e293b] mb-4 leading-tight">IT Infrastructure Support</h4>
              <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-grow">
                Procure Servers, Firewalls, Storage, and Internet Leased Lines from verified local providers.
              </p>
              <Link to="/products" className="text-indigo-600 font-black uppercase text-xs tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                Learn more <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Growth Dashboard Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="reveal bg-white rounded-[64px] p-8 md:p-16 shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-[#1e293b] tracking-tight">Marketplace Growth Dashboard</h2>
                <p className="text-sm font-bold text-slate-400 mt-2 uppercase tracking-widest">Real-time enterprise procurement metrics across India</p>
              </div>
              <span className="px-6 py-3 rounded-full bg-blue-50 text-blue-600 text-[11px] font-black uppercase tracking-widest flex items-center gap-3 border border-blue-100 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span> LIVE MARKET ACTIVITY
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
               {/* Stat Card 1 */}
               <div className="reveal reveal-delay-1 bg-blue-600 rounded-[56px] p-12 text-white shadow-2xl shadow-blue-600/30 flex flex-col justify-between h-80">
                  <div>
                    <div className="flex justify-between items-start mb-10">
                      <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">🏢</div>
                      <span className="text-[10px] font-black bg-white/20 px-4 py-1.5 rounded-full uppercase tracking-widest">ACTIVE NETWORK</span>
                    </div>
                    <p className="text-[11px] font-black uppercase tracking-widest opacity-80 mb-2">VERIFIED SELLERS</p>
                    <p className="text-7xl font-black mb-3 tracking-tighter">1,250+</p>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-80">PAN-INDIA SUPPORT AVAILABLE</p>
               </div>

               {/* Stat Card 2 */}
               <div className="reveal reveal-delay-2 bg-white rounded-[56px] p-12 border border-slate-100 shadow-xl flex flex-col justify-between h-80">
                  <div>
                    <div className="flex justify-between items-start mb-10">
                      <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl text-amber-500">⚡</div>
                      <span className="text-[10px] font-black bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full uppercase tracking-widest border border-emerald-100">↑ 23% UP</span>
                    </div>
                    <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">REQUIREMENT VOLUME</p>
                    <p className="text-7xl font-black text-[#1e293b] mb-3 tracking-tighter">₹86,032</p>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total verified leads processed</p>
               </div>
               
               {/* Stat Card 3 */}
               <div className="reveal reveal-delay-3 bg-[#0f172a] rounded-[56px] p-12 text-white flex flex-col relative overflow-hidden h-80 group">
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex justify-between items-center mb-10">
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">IT PROCUREMENT TRENDS</p>
                      <span className="text-[9px] font-black bg-white/10 px-3 py-1.5 rounded-full uppercase text-slate-400">Monthly</span>
                    </div>
                    <p className="text-3xl font-black mb-3">Demand Surge</p>
                    <p className="text-sm font-medium text-slate-400 leading-relaxed mb-6">Cloud Telephony & HRMS seeing 2x higher intent scores this quarter.</p>
                    
                    <div className="mt-auto h-24 w-full relative">
                       <svg className="w-full h-full" viewBox="0 0 400 120" preserveAspectRatio="none">
                          <path d="M0,100 C50,90 100,110 150,90 C200,70 250,95 300,70 C350,55 380,45 400,35 L400,120 L0,120 Z" fill="rgba(37, 99, 235, 0.1)" />
                          <path d="M0,100 C50,90 100,110 150,90 C200,70 250,95 300,70 C350,55 380,45 400,35" fill="none" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round" />
                       </svg>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Discovery Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div>
              <h2 className="text-4xl md:text-7xl font-black text-[#1e293b] tracking-tighter mb-4 leading-tight">Find Right Solutions</h2>
              <p className="text-slate-500 font-bold text-lg uppercase tracking-widest">Browse CRM, ERP, Cloud Telephony, and IT Hardware.</p>
            </div>
            <div className="reveal reveal-delay-1 relative w-full md:w-[480px]">
               <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-slate-400">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
               </div>
               <input 
                 type="text" 
                 placeholder="Search Solutions..."
                 className="w-full bg-white border border-slate-200 rounded-[32px] py-7 pl-16 pr-8 text-base text-slate-700 font-bold focus:ring-8 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none shadow-2xl shadow-slate-200/40"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {displayProducts.map((product, i) => (
              <div key={product.id} className={`reveal reveal-delay-${(i % 2) + 1} bg-white rounded-[64px] overflow-hidden border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-700 flex flex-col group p-3`}>
                <div className="relative h-80 rounded-[56px] overflow-hidden bg-slate-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute top-8 right-8 bg-white/95 backdrop-blur px-5 py-2.5 rounded-2xl flex items-center gap-2 shadow-xl border border-white">
                     <span className="text-amber-500 font-black text-sm">★</span>
                     <span className="text-[#1e293b] font-black text-base">{product.rating}</span>
                  </div>
                  <div className="absolute bottom-8 left-8 bg-blue-600/95 backdrop-blur px-6 py-2.5 rounded-2xl text-[11px] font-black text-white uppercase tracking-widest shadow-2xl border border-white/20">
                    {product.category}
                  </div>
                </div>

                <div className="p-10 md:p-14 pt-12 flex-grow flex flex-col">
                  <h3 className="text-4xl font-black text-[#1e293b] mb-2">{product.name}</h3>
                  <p className="text-slate-400 font-bold mb-12 text-sm uppercase tracking-widest leading-relaxed">{product.vendorName} • {product.price}</p>
                  
                  <div className="flex flex-col gap-4 mt-auto">
                    <Link to={`/products/${product.slug}`} className="w-full py-5 bg-slate-50 text-slate-600 rounded-[28px] text-xs font-black text-center uppercase tracking-widest hover:bg-blue-50 hover:text-blue-600 transition-all">
                      VIEW DETAILS
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
           <div className="reveal bg-[#0f172a] rounded-[80px] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px] translate-x-1/2 -translate-y-1/2"></div>
              
              <div className="relative z-10">
                <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-12 leading-[1.1] max-w-4xl mx-auto">Post Your Software or IT Requirement</h2>
                <p className="text-slate-400 text-lg md:text-2xl font-medium mb-16 max-w-4xl mx-auto leading-relaxed">
                  Get AI-matched with verified vendors within 24 hours. Transparent, fast, and verified.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Link to="/lead-wizard" className="w-full sm:w-auto px-20 py-6 bg-blue-600 text-white rounded-[32px] font-black hover:bg-blue-700 transition-all text-lg shadow-2xl shadow-blue-600/20 uppercase tracking-widest active:scale-95">
                    Get Started Now
                  </Link>
                  <Link to="/products" className="w-full sm:w-auto px-20 py-6 bg-white/10 text-white border border-white/20 rounded-[32px] font-black hover:bg-white/20 transition-all text-lg uppercase tracking-widest">
                    Browse Marketplace
                  </Link>
                </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
