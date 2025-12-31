
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
    document.title = "BantConfirm – India's Smartest B2B AI Marketplace";

    const savedLogos = localStorage.getItem('marketplaceVendorLogos');
    if (savedLogos) {
      setVendorLogos(JSON.parse(savedLogos));
    } else {
      const defaults: VendorLogo[] = [
        { id: 'd1', name: 'Microsoft', image: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
        { id: 'd2', name: 'Tally', image: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Tally_Solutions_Logo.svg' },
        { id: 'd3', name: 'Airtel', image: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Airtel_logo.svg' },
        { id: 'd4', name: 'Zoho', image: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Zoho_Corporation_logo.svg' },
        { id: 'd5', name: 'Jio', image: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Reliance_Jio_Logo.svg' }
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
      <section className="relative pt-12 md:pt-32 pb-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="reveal inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-200/50 mb-10 shadow-sm backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-blue-700">AI-Driven B2B Procurement</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.05] mb-10">
            <span className="reveal inline-block mr-2 md:mr-3">The</span>
            <span className="reveal reveal-delay-1 inline-block mr-2 md:mr-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Premier</span>
            <span className="reveal reveal-delay-2 inline-block mr-2 md:mr-3">IT</span>
            <span className="reveal reveal-delay-3 inline-block">Marketplace</span>
            <br className="hidden lg:block"/> 
            <span className="reveal reveal-delay-4 inline-block mr-2 md:mr-3">for</span>
            <span className="reveal reveal-delay-5 inline-block mr-2 md:mr-3 text-amber-500">MSMEs</span>
            <span className="reveal reveal-delay-6 inline-block mr-2 md:mr-3">&</span>
            <span className="reveal reveal-delay-7 inline-block text-emerald-600">Enterprises</span>
            <br className="hidden md:block"/>
            <span className="reveal reveal-delay-8 text-blue-600 block mt-4 text-2xl md:text-5xl opacity-90 font-extrabold">Software, IT Hardware & Services</span>
          </h1>
          
          <p className="reveal reveal-delay-9 text-lg md:text-xl text-slate-600 mb-14 max-w-3xl mx-auto leading-relaxed font-semibold">
            Discover, Compare, and Buy Enterprise-grade IT Solutions. We connect Indian businesses with verified top-tier vendors using AI-driven BANT matching.
          </p>
          
          <div className="reveal reveal-delay-10 flex flex-col sm:flex-row items-center justify-center gap-6 mb-24">
            <Link to="/products" className="w-full sm:w-auto px-12 py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl font-black shadow-2xl shadow-blue-600/40 hover:scale-105 transition-all text-base active:scale-95">
              Explore Solutions
            </Link>
            <Link to="/lead-wizard" className="w-full sm:w-auto px-12 py-5 bg-white/80 backdrop-blur border border-slate-200 text-slate-700 rounded-2xl font-black hover:bg-white transition-all shadow-xl text-base hover:scale-105 active:scale-95">
              Post My Requirement
            </Link>
          </div>
        </div>

        {/* Logo Marquee Section */}
        <div className="reveal reveal-delay-5 py-12 relative overflow-hidden bg-white/30 backdrop-blur-xl border-y border-white/50">
          <div className="max-w-7xl mx-auto px-4 mb-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 text-center">Empowering Businesses with Global Partners</h4>
          </div>
          <div className="flex overflow-hidden">
            <div className="flex animate-marquee space-x-12 md:space-x-24 whitespace-nowrap py-4 items-center">
              {[...vendorLogos, ...vendorLogos].map((logo, idx) => (
                <div key={`${logo.id}-${idx}`} className="flex-shrink-0 w-32 md:w-44 h-12 flex items-center justify-center filter grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                  <img src={logo.image} alt={logo.name} className="max-h-full max-w-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* POSITIONED HERE: Marketplace Growth Dashboard - Now directly below vendor logos */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="reveal glass rounded-[56px] p-8 md:p-14 shadow-2xl shadow-blue-500/5 border border-white/80 overflow-hidden relative">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Marketplace Growth Dashboard</h2>
                <p className="text-sm font-bold text-slate-500 mt-1">Real-time enterprise procurement metrics across India</p>
              </div>
              <span className="px-5 py-2 rounded-full bg-emerald-50 backdrop-blur-sm text-emerald-600 text-[11px] font-black uppercase tracking-widest flex items-center gap-3 border border-emerald-100/50">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Live Market Activity
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
               <div className="reveal reveal-delay-1 bg-gradient-to-br from-blue-600 to-blue-700 rounded-[32px] p-10 text-white shadow-xl shadow-blue-600/20">
                  <div className="flex justify-between items-start mb-10">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-xl">🏢</div>
                    <span className="text-[10px] font-black bg-white/20 px-3 py-1 rounded-full uppercase tracking-widest">Active Network</span>
                  </div>
                  <p className="text-[11px] font-black uppercase tracking-widest opacity-80 mb-2">Verified Sellers</p>
                  <p className="text-5xl font-black mb-3 tracking-tighter">1,250+</p>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Pan-India Support Available</p>
               </div>

               <div className="reveal reveal-delay-2 bg-white rounded-[32px] p-10 border border-slate-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-10">
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-xl">⚡</div>
                      <span className="text-[10px] font-black bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-100">↑ 23% Up</span>
                    </div>
                    <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">Requirement Volume</p>
                    <p className="text-5xl font-black text-slate-900 mb-3 tracking-tighter">₹86,032</p>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total verified leads processed</p>
               </div>
               
               <div className="reveal reveal-delay-3 bg-slate-900 rounded-[32px] p-10 text-white flex flex-col relative overflow-hidden group">
                  <div className="relative z-10">
                    <div className="flex justify-between items-center mb-10">
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">IT Procurement Trends</p>
                      <span className="text-[9px] font-black bg-white/10 px-3 py-1 rounded-full uppercase text-slate-400">Monthly</span>
                    </div>
                    <p className="text-xl font-black mb-1">Demand Surge</p>
                    <p className="text-sm font-medium text-slate-400 leading-relaxed mb-6">Cloud Telephony & HRMS seeing 2x higher intent scores this quarter.</p>
                  </div>
                  
                  <div className="mt-auto h-24 w-full relative group-hover:scale-110 transition-transform duration-700">
                     <svg className="w-full h-full" viewBox="0 0 400 120" preserveAspectRatio="none">
                        <path d="M0,100 C50,90 100,110 150,90 C200,70 250,95 300,70 C350,55 380,45 400,35 L400,120 L0,120 Z" fill="rgba(37, 99, 235, 0.2)" />
                        <path d="M0,100 C50,90 100,110 150,90 C200,70 250,95 300,70 C350,55 380,45 400,35" fill="none" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" />
                     </svg>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-4 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[160px] translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] -translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="px-5 py-2 bg-blue-600/20 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-full mb-8 inline-block border border-blue-600/30">The BantConfirm Philosophy</span>
          <h2 className="text-4xl md:text-6xl font-black mb-10 tracking-tighter leading-tight">
            Every genuine business requirement <br className="hidden md:block"/> 
            has value — <span className="bg-gradient-to-r from-amber-400 to-yellow-200 bg-clip-text text-transparent">even when it goes unused.</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl font-medium max-w-4xl mx-auto leading-relaxed mb-20">
            BantConfirm is a trust-first marketplace where sales professionals, developers, consultants, and business owners post intent-verified requirements and connect them with the right solution providers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
            <div className="p-10 rounded-[48px] bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all hover:bg-white/[0.07] group">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1"></path></svg></div>
              <h3 className="text-2xl font-black mb-4">For Referrers</h3>
              <p className="text-slate-400 font-medium">Post qualified requirements and earn <span className="text-amber-400 font-bold">up to 10% commission</span> on closed deals.</p>
            </div>
            <div className="p-10 rounded-[48px] bg-white/5 border border-white/10 hover:border-yellow-400/50 transition-all hover:bg-white/[0.07] group">
              <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg></div>
              <h3 className="text-2xl font-black mb-4 text-white">For Buyers</h3>
              <p className="text-slate-400 font-medium">Post your requirement once. AI matching connects you with the <span className="text-white font-bold">right vendors faster.</span></p>
            </div>
            <div className="p-10 rounded-[48px] bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-all hover:bg-white/[0.07] group">
              <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
              <h3 className="text-2xl font-black mb-4 text-white">For Vendors</h3>
              <p className="text-slate-400 font-medium">Receive pre-qualified opportunities. Every requirement is structured for <span className="text-emerald-400 font-bold">maximum conversion.</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">Find Right Solutions</h2>
              <p className="text-slate-600 font-bold text-base md:text-lg">Browse CRM, ERP, Cloud Telephony, and IT Hardware.</p>
            </div>
            <div className="reveal reveal-delay-1 relative w-full md:w-[400px]">
               <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                 <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
               </div>
               <input 
                 type="text" 
                 placeholder="Search Tally, Zoho, Airtel..."
                 className="w-full bg-white/60 backdrop-blur border border-slate-200 rounded-[28px] py-4 pl-14 pr-6 text-sm text-slate-700 font-bold focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
            </div>
          </div>

          <div className="reveal reveal-delay-2 flex flex-wrap gap-3 mb-16">
            {['All Solutions', 'Telecom', 'Software', 'Marketing', 'IT Hardware'].map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border-2 ${activeCategory === cat ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-white/80 border-white text-slate-500 hover:border-blue-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {displayProducts.map((product, i) => (
              <div key={product.id} className={`reveal reveal-delay-${(i % 2) + 1} bg-white/80 backdrop-blur-xl rounded-[48px] overflow-hidden border border-white shadow-xl hover:shadow-2xl transition-all duration-700 flex flex-col group`}>
                <div className="relative h-72 overflow-hidden bg-slate-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute top-6 left-6 w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                  </div>
                  <div className="absolute top-6 right-6 bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg border border-white">
                     <span className="text-amber-500 font-black text-xs">★</span>
                     <span className="text-slate-800 font-black text-sm">{product.rating}</span>
                  </div>
                </div>

                <div className="p-10 flex-grow flex flex-col">
                  <h3 className="text-3xl font-black text-slate-900 mb-2">{product.name}</h3>
                  <p className="text-slate-400 font-bold mb-8 text-sm uppercase tracking-wide">{product.shortDescription}</p>
                  
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-[32px] p-6 mb-10 border border-white">
                     <div className="flex items-center gap-3 mb-5">
                       <div className="bg-amber-400 p-1.5 rounded-lg shadow-lg shadow-amber-400/20">
                         <svg className="w-4 h-4 text-slate-900 fill-current" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                       </div>
                       <span className="text-[11px] uppercase font-black tracking-widest text-slate-400">Key Features</span>
                     </div>
                     <ul className="space-y-4">
                       {product.features.map((f, idx) => (
                         <li key={idx} className="text-xs font-bold text-slate-600 flex items-start gap-3">
                           <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-[-2px]" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg> 
                           <span>{f}</span>
                         </li>
                       ))}
                     </ul>
                  </div>

                  <div className="mt-auto">
                     <div className="mb-8 flex items-baseline gap-2">
                        <span className="text-3xl font-black text-slate-900 tracking-tight">{product.price}</span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Base Rate</span>
                     </div>
                     <div className="flex flex-col gap-4">
                        <div className="flex gap-4">
                          <Link to={`/products/${product.slug}`} className="flex-grow py-5 bg-blue-600 text-white rounded-2xl text-sm font-black text-center shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all active:scale-95">Details</Link>
                          <button className="w-20 h-16 bg-white border-2 border-slate-100 rounded-2xl flex items-center justify-center hover:bg-slate-50 transition-all text-slate-300">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          </button>
                        </div>
                        <Link to="/lead-wizard" className="w-full py-5 bg-amber-400 text-slate-900 rounded-2xl text-sm font-black text-center shadow-xl shadow-amber-400/30 hover:bg-amber-500 transition-all block uppercase tracking-widest">Consult Expert</Link>
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why BantConfirm Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="reveal text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none mb-6">Why BantConfirm?</h2>
            <h3 className="text-xl md:text-2xl font-bold text-blue-600 mb-6 uppercase tracking-wider">India’s Smartest IT Procurement Hub</h3>
            <p className="text-slate-600 text-lg md:text-xl font-semibold max-w-3xl mx-auto leading-relaxed">
              No data selling. No fake leads. Only AI-verified requirements and trusted partners.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "AI-Verified", color: "from-blue-500 to-indigo-600", icon: <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg> },
              { title: "Privacy First", color: "from-emerald-500 to-teal-600", icon: <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> },
              { title: "Audited Partners", color: "from-amber-500 to-orange-600", icon: <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m14-10a4 4 0 11-8 0 4 4 0 018 0z"></path></svg> },
              { title: "High Intent", color: "from-purple-500 to-pink-600", icon: <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> }
            ].map((f, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1} p-10 rounded-[48px] bg-white/80 backdrop-blur border border-white shadow-xl hover:scale-105 transition-all flex flex-col items-center text-center`}>
                <div className={`w-20 h-20 rounded-[28px] bg-gradient-to-br ${f.color} flex items-center justify-center mb-8 shadow-2xl`}>
                  {f.icon}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-4">{f.title}</h3>
                <p className="text-slate-500 font-semibold text-sm leading-relaxed">Verified methodology ensuring project viability and intent.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
           <div className="reveal bg-gradient-to-br from-slate-900 to-indigo-950 rounded-[64px] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[160px] translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/20 rounded-full blur-[140px] -translate-x-1/2 translate-y-1/2"></div>
              
              <div className="relative z-10">
                <h2 className="text-4xl md:text-7xl font-black tracking-tight mb-8">Post Your Software or IT Requirement</h2>
                <p className="text-slate-300 text-lg md:text-2xl font-medium mb-12 max-w-4xl mx-auto leading-relaxed">
                  Get AI-matched with verified vendors within 24 hours. Transparent, fast, and verified.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Link to="/products" className="w-full sm:w-auto px-12 py-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl font-black hover:scale-105 transition-all text-lg shadow-2xl active:scale-95">
                    Browse Solutions
                  </Link>
                  <Link to="/lead-wizard" className="w-full sm:w-auto px-12 py-6 bg-white/10 backdrop-blur border border-white/20 text-white rounded-2xl font-black hover:bg-white/20 transition-all text-lg active:scale-95">
                    Talk to Sales
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
