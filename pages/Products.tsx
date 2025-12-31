
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PRODUCTS as initialProducts } from '../constants';
import JsonLd from '../components/JsonLd';
import { Product } from '../types';

const Products: React.FC = () => {
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState('All Solutions');
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState<string[]>(['All Solutions', 'Telecom', 'Software', 'Marketing', 'IT Hardware']);

  useEffect(() => {
    document.title = "Explore Solutions - Verified B2B Marketplace | BantConfirm";
    
    // Check for initial category filter from state
    if (location.state && (location.state as any).category) {
      setFilter((location.state as any).category);
    }

    const saved = localStorage.getItem('marketplaceProducts');
    if (saved) {
      setProducts(JSON.parse(saved));
    } else {
      setProducts(initialProducts);
      localStorage.setItem('marketplaceProducts', JSON.stringify(initialProducts));
    }

    const savedCats = localStorage.getItem('marketplaceCategories');
    if (savedCats) {
      const cats = JSON.parse(savedCats);
      setCategories(['All Solutions', ...cats]);
    }
  }, [location.state]);

  const filtered = products.filter(p => {
    const matchesFilter = filter === 'All Solutions' || p.category.toLowerCase() === filter.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.shortDescription.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="pt-40 pb-32 px-4 bg-[#f8fafc]">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", "name": "BantConfirm Enterprise Marketplace" }} />
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">Find the Right Business Solutions</h1>
          <p className="text-slate-500 font-bold text-sm md:text-base">Browse CRM, ERP, Cloud Telephony, and IT Hardware from verified vendors.</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative mb-12 max-w-4xl">
           <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
             <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
           </div>
           <input 
             type="text" 
             placeholder="Search Tally, Zoho, Airtel, Microsoft License..."
             className="w-full bg-white border border-slate-200 rounded-[32px] py-6 pl-16 pr-10 text-base text-slate-700 font-bold focus:ring-8 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none shadow-xl shadow-slate-200/50"
             value={search}
             onChange={(e) => setSearch(e.target.value)}
           />
        </div>

        {/* Categories / Filters */}
        <div className="flex flex-wrap gap-4 mb-16">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all border-2 ${filter.toLowerCase() === cat.toLowerCase() ? 'bg-[#1e293b] text-white border-[#1e293b] shadow-xl' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {filtered.map(product => (
              <div key={product.id} className="bg-white rounded-[48px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col group h-full">
                {/* Product Image and Badges */}
                <div className="relative h-72 overflow-hidden bg-slate-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  
                  {/* Category Icon Badge */}
                  <div className="absolute top-6 left-6 w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                  </div>
                  
                  {/* Rating Badge */}
                  <div className="absolute top-6 right-6 bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg border border-white">
                     <span className="text-amber-500 font-black text-xs">★</span>
                     <span className="text-slate-800 font-black text-sm">{product.rating}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-10 flex-grow flex flex-col">
                  <h3 className="text-3xl font-black text-slate-900 mb-2">{product.name}</h3>
                  <p className="text-slate-400 font-bold mb-8 leading-tight text-sm uppercase tracking-wide">{product.shortDescription}</p>
                  
                  {/* Key Features Box */}
                  <div className="bg-[#f8fafc] rounded-[32px] p-6 mb-10 border border-slate-50">
                     <div className="flex items-center gap-3 mb-5">
                       <div className="bg-amber-400 p-1.5 rounded-lg shadow-lg shadow-amber-400/30">
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

                  {/* Pricing and Actions */}
                  <div className="mt-auto">
                     <div className="mb-8">
                        <span className="text-3xl font-black text-slate-900 tracking-tight">{product.price}</span>
                     </div>
                     
                     <div className="flex flex-col gap-4">
                        <div className="flex gap-4">
                          <Link 
                            to={`/products/${product.slug}`} 
                            className="flex-grow py-5 bg-blue-600 text-white rounded-2xl text-sm font-black text-center shadow-xl shadow-blue-600/30 hover:bg-blue-700 transition-all active:scale-95"
                          >
                            Details
                          </Link>
                          <button className="w-20 h-16 bg-white border-2 border-slate-100 rounded-2xl flex items-center justify-center hover:bg-slate-50 transition-all text-slate-300">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          </button>
                        </div>
                        
                        <Link to="/lead-wizard" className="w-full py-5 bg-amber-400 text-slate-900 rounded-2xl text-sm font-black text-center shadow-xl shadow-amber-400/30 hover:bg-amber-500 transition-all block uppercase tracking-widest">
                           Consult Expert
                        </Link>
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center bg-white rounded-[48px] border border-slate-100 shadow-sm">
             <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8"><svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div>
             <h3 className="text-2xl font-black text-slate-900 mb-4">No solutions found</h3>
             <p className="text-slate-500 font-bold mb-10">Try adjusting your filters or search terms.</p>
             <button onClick={() => {setSearch(''); setFilter('All Solutions');}} className="px-10 py-4 bg-[#1e293b] text-white rounded-full font-black text-xs uppercase tracking-widest">Reset all filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
