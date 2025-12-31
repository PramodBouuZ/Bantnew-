
import React, { useEffect, useState } from 'react';
import { PRODUCTS as initialProducts, BLOG_POSTS as initialBlogs } from '../constants';
import { Product, BlogPost, VendorLogo } from '../types';

interface Vendor {
  id: string;
  name: string;
  companyName: string;
  mobile: string;
  email: string;
  location: string;
  category: string;
  productExpertise: string;
  customBox: string;
  verified: boolean;
}

interface Lead {
  id: string;
  contactName: string;
  companyName: string;
  location: string;
  mobile: string;
  email: string;
  requirement: string;
  budget: string;
  authority: string;
  need: string;
  timeline: string;
  date: string;
  status: string;
  remarks: string;
  assignedVendorId: string;
  intentScore?: number;
}

interface AdminDashboardProps {
  onLogout?: () => void;
  settings: any;
  setSettings: (s: any) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, settings, setSettings }) => {
  const [activeTab, setActiveTab] = useState('PRODUCTS');

  // --- ENTITY MODAL STATES ---
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Partial<Vendor> | null>(null);

  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Partial<BlogPost> | null>(null);

  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [editingLogo, setEditingLogo] = useState<Partial<VendorLogo> | null>(null);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryInputValue, setCategoryInputValue] = useState('');

  const [isLeadDetailOpen, setIsLeadDetailOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // --- ENTITY STATES ---
  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('marketplaceLeads');
    return saved ? JSON.parse(saved) : [];
  });

  const [vendors, setVendors] = useState<Vendor[]>(() => {
    const saved = localStorage.getItem('marketplaceVendors');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Amit Kumar', companyName: 'Nexus Solutions', email: 'amit@nexus.com', mobile: '9876543210', location: 'Noida', category: 'Software', productExpertise: 'CRM', customBox: 'Verified', verified: true }
    ];
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('marketplaceProducts');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [categories, setCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem('marketplaceCategories');
    return saved ? JSON.parse(saved) : ['Software', 'Telecom', 'Marketing', 'IT Hardware'];
  });

  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('marketplaceBlogs');
    return saved ? JSON.parse(saved) : initialBlogs;
  });

  const [vendorLogos, setVendorLogos] = useState<VendorLogo[]>(() => {
    const saved = localStorage.getItem('marketplaceVendorLogos');
    return saved ? JSON.parse(saved) : [
      { id: 'd1', name: 'Microsoft', image: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
      { id: 'd2', name: 'Tally', image: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Tally_Solutions_Logo.svg' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('marketplaceLeads', JSON.stringify(leads));
    localStorage.setItem('marketplaceProducts', JSON.stringify(products));
    localStorage.setItem('marketplaceVendors', JSON.stringify(vendors));
    localStorage.setItem('marketplaceBlogs', JSON.stringify(blogs));
    localStorage.setItem('marketplaceVendorLogos', JSON.stringify(vendorLogos));
    localStorage.setItem('marketplaceCategories', JSON.stringify(categories));
  }, [leads, products, vendors, blogs, vendorLogos, categories]);

  // --- HELPERS ---
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => callback(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const downloadLeadsCSV = () => {
    if (leads.length === 0) return alert('No leads to download');
    const headers = ['Date', 'Contact', 'Company', 'Email', 'Mobile', 'Requirement', 'Status', 'Remarks', 'Assigned Vendor'];
    const rows = leads.map(l => {
      const vendor = vendors.find(v => v.id === l.assignedVendorId)?.companyName || 'Unassigned';
      return [
        `"${l.date}"`, `"${l.contactName}"`, `"${l.companyName}"`, `"${l.email}"`, `"${l.mobile}"`, 
        `"${l.requirement?.replace(/"/g, '""')}"`, `"${l.status}"`, 
        `"${l.remarks?.replace(/"/g, '""')}"`, `"${vendor}"`
      ];
    });

    const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `leads_export_${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- SAVE ACTIONS ---
  const saveProduct = () => {
    if (!editingProduct?.name) return;
    const productToSave = {
      ...editingProduct,
      id: editingProduct.id || Date.now().toString(),
      slug: editingProduct.slug || editingProduct.name.toLowerCase().replace(/\s+/g, '-'),
      images: editingProduct.images?.length ? editingProduct.images : [editingProduct.image || 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=800'],
      image: editingProduct.images?.[0] || editingProduct.image || 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=800',
      features: editingProduct.features?.filter(f => f.trim()) || ['Standard B2B Support'],
      rating: editingProduct.rating || 5,
      vendorRating: editingProduct.vendorRating || 4.8
    } as Product;

    if (editingProduct.id) {
      setProducts(products.map(p => p.id === editingProduct.id ? productToSave : p));
    } else {
      setProducts([productToSave, ...products]);
    }
    setIsProductModalOpen(false);
  };

  const saveVendor = () => {
    if (!editingVendor?.companyName) return;
    const vendorToSave = { ...editingVendor, id: editingVendor.id || Date.now().toString() } as Vendor;
    if (editingVendor.id) {
      setVendors(vendors.map(v => v.id === editingVendor.id ? vendorToSave : v));
    } else {
      setVendors([vendorToSave, ...vendors]);
    }
    setIsVendorModalOpen(false);
  };

  const saveLogo = () => {
    if (!editingLogo?.image) return;
    if (editingLogo.id) {
      setVendorLogos(vendorLogos.map(l => l.id === editingLogo.id ? (editingLogo as VendorLogo) : l));
    } else {
      setVendorLogos([...vendorLogos, { ...editingLogo, id: Date.now().toString() } as VendorLogo]);
    }
    setIsLogoModalOpen(false);
  };

  const saveCategory = () => {
    if (!categoryInputValue.trim()) return;
    if (!categories.includes(categoryInputValue)) {
      setCategories([...categories, categoryInputValue]);
    }
    setIsCategoryModalOpen(false);
    setCategoryInputValue('');
  };

  const updateLeadInStorage = (updatedLead: Lead) => {
    setLeads(leads.map(l => l.id === updatedLead.id ? updatedLead : l));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'OVERVIEW':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {[
              { name: 'QUALIFIED LEADS', value: leads.length, icon: '⚡' },
              { name: 'SELLERS/VENDORS', value: vendors.length, icon: '🏢' },
              { name: 'MARKET ITEMS', value: products.length, icon: '📦' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-12 rounded-[56px] flex items-center gap-12 group transition-all hover:shadow-2xl hover:shadow-slate-200/50 border border-slate-50">
                <div className="w-20 h-20 rounded-full bg-[#f8fafc] flex items-center justify-center text-4xl shadow-sm group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.25em]">{stat.name}</p>
                  <h3 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">{stat.value}</h3>
                </div>
              </div>
            ))}
          </div>
        );

      case 'LEADS':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
             <div className="bg-white p-12 rounded-[56px] border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Requirement Analysis</h2>
                  <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">Verified enterprise BANT enquiries.</p>
                </div>
                <button onClick={downloadLeadsCSV} className="px-10 py-4 bg-[#0f172a] text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-black transition-all shadow-xl">
                  DOWNLOAD CSV
                </button>
             </div>
             <div className="bg-white rounded-[56px] border border-slate-100 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-[#f8fafc] border-b border-slate-50">
                    <tr>
                      <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer / Org</th>
                      <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {leads.map(lead => (
                      <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-10 py-8">
                          <p className="font-black text-slate-900 text-base">{lead.contactName}</p>
                          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">{lead.companyName}</p>
                        </td>
                        <td className="px-10 py-8">
                          <span className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border ${lead.status === 'Qualified' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-10 py-8 text-right">
                          <button onClick={() => { setSelectedLead(lead); setIsLeadDetailOpen(true); }} className="text-[11px] font-black uppercase text-blue-600 hover:bg-blue-50 px-5 py-2.5 rounded-xl transition-all">Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
             {isLeadDetailOpen && selectedLead && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                <div className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-md" onClick={() => setIsLeadDetailOpen(false)}></div>
                <div className="bg-white rounded-[64px] p-12 w-full max-w-4xl relative animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
                   <h3 className="text-4xl font-black mb-10 text-slate-900 tracking-tight">Lead Audit: {selectedLead.contactName}</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-6">
                        <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Contact Profile</p>
                          <div className="space-y-3">
                            <p className="text-sm font-bold text-slate-700">Email: <span className="text-blue-600">{selectedLead.email}</span></p>
                            <p className="text-sm font-bold text-slate-700">Mobile: <span>{selectedLead.mobile}</span></p>
                            <p className="text-sm font-bold text-slate-700">Location: <span>{selectedLead.location}</span></p>
                          </div>
                        </div>
                        <div className="p-8 bg-white border border-slate-100 rounded-[40px] shadow-sm h-full">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">BANT Requirements</p>
                           <p className="text-sm font-medium leading-relaxed italic text-slate-600">"{selectedLead.need || selectedLead.requirement}"</p>
                        </div>
                      </div>
                      <div className="space-y-6">
                         <div className="p-8 bg-indigo-50 border border-indigo-100 rounded-[40px]">
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">Assign Verified Vendor</p>
                            <select 
                              className="w-full p-4 rounded-2xl bg-white border-none font-bold text-sm outline-none shadow-sm mb-6"
                              value={selectedLead.assignedVendorId}
                              onChange={(e) => {
                                const updated = { ...selectedLead, assignedVendorId: e.target.value };
                                setSelectedLead(updated);
                                updateLeadInStorage(updated);
                              }}
                            >
                              <option value="">Unassigned</option>
                              {vendors.map(v => <option key={v.id} value={v.id}>{v.companyName}</option>)}
                            </select>
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">Admin Audit Remarks</p>
                            <textarea 
                              rows={4}
                              className="w-full p-4 rounded-2xl bg-white border-none font-bold text-sm outline-none shadow-sm resize-none"
                              placeholder="Notes for internal verification..."
                              value={selectedLead.remarks}
                              onChange={(e) => {
                                const updated = { ...selectedLead, remarks: e.target.value };
                                setSelectedLead(updated);
                                updateLeadInStorage(updated);
                              }}
                            />
                         </div>
                      </div>
                   </div>
                   <button onClick={() => setIsLeadDetailOpen(false)} className="w-full py-6 bg-[#0f172a] text-white rounded-full font-black uppercase text-xs tracking-[0.2em] mt-10 hover:bg-black transition-all">Close Lead Record</button>
                </div>
              </div>
             )}
          </div>
        );

      case 'PRODUCTS':
        return (
          <div className="space-y-12 animate-in fade-in duration-500">
             <div className="text-center bg-white p-12 rounded-[56px] border border-slate-100 shadow-sm">
                <h2 className="text-4xl font-black text-[#1e293b] tracking-tight mb-2">Marketplace Catalog</h2>
                <p className="text-base font-bold text-slate-400 uppercase tracking-widest">Add solutions and dynamic enterprise features.</p>
                <button onClick={() => { setEditingProduct({ name: '', price: '', category: categories[0], shortDescription: '', description: '', features: [''], vendorName: '', images: [] }); setIsProductModalOpen(true); }} className="mt-8 px-12 py-5 bg-[#2563eb] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all hover:scale-105">
                  + NEW PRODUCT
                </button>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {products.map(p => (
                  <div key={p.id} className="bg-white rounded-[56px] border border-slate-100 shadow-sm overflow-hidden flex flex-col group p-2 pb-8">
                     <div className="h-64 rounded-[48px] overflow-hidden m-2 relative bg-slate-50">
                        <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute top-6 right-6 bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black text-blue-600 uppercase shadow-sm border border-blue-50">{p.category}</div>
                     </div>
                     <div className="px-10 pt-6">
                        <h3 className="text-2xl font-black text-[#1e293b] mb-1">{p.name}</h3>
                        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-8">{p.vendorName || 'General Provider'} • {p.price}</p>
                        <div className="flex gap-4">
                           <button onClick={() => { setEditingProduct(p); setIsProductModalOpen(true); }} className="flex-[4] py-4 bg-[#f8fafc] rounded-2xl font-black text-[11px] uppercase tracking-widest text-slate-500 hover:bg-[#eff6ff] hover:text-blue-600 transition-all">EDIT SOLUTION</button>
                           <button onClick={() => setProducts(products.filter(item => item.id !== p.id))} className="flex-1 py-4 bg-[#fff1f2] text-[#e11d48] rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all hover:bg-red-100">DEL</button>
                        </div>
                     </div>
                  </div>
                ))}
             </div>

             {isProductModalOpen && editingProduct && (
               <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                 <div className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-md" onClick={() => setIsProductModalOpen(false)}></div>
                 <div className="bg-white rounded-[64px] p-10 md:p-14 w-full max-w-5xl relative animate-in zoom-in-95 duration-300 max-h-[95vh] overflow-y-auto scrollbar-hide">
                    <div className="flex justify-between items-center mb-12">
                       <h3 className="text-3xl font-black text-slate-900 tracking-tight">Enterprise Solution Manager</h3>
                       <button onClick={() => setIsProductModalOpen(false)} className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center font-black text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all">×</button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                       <div className="space-y-6">
                          <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Product Title</label>
                            <input type="text" className="w-full px-6 py-4 rounded-2xl bg-[#f8fafc] border border-slate-100 outline-none font-bold text-slate-700 focus:bg-white transition-all" placeholder="e.g. Zoho CRM Enterprise" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} />
                          </div>
                          <div className="grid grid-cols-2 gap-6">
                             <div>
                               <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Price / Model</label>
                               <input type="text" className="w-full px-6 py-4 rounded-2xl bg-[#f8fafc] border border-slate-100 outline-none font-bold text-slate-700" placeholder="e.g. ₹5000/mo" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: e.target.value})} />
                             </div>
                             <div>
                               <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Vendor Provider</label>
                               <input type="text" className="w-full px-6 py-4 rounded-2xl bg-[#f8fafc] border border-slate-100 outline-none font-bold text-slate-700" placeholder="Company Name" value={editingProduct.vendorName} onChange={e => setEditingProduct({...editingProduct, vendorName: e.target.value})} />
                             </div>
                          </div>
                          <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Industry Segment</label>
                            <select className="w-full px-6 py-4 rounded-2xl bg-[#f8fafc] border border-slate-100 outline-none font-bold text-slate-700" value={editingProduct.category} onChange={e => setEditingProduct({...editingProduct, category: e.target.value})}>
                               {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                          </div>
                          <div>
                             <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Short Pitch (Summary)</label>
                             <input type="text" className="w-full px-6 py-4 rounded-2xl bg-[#f8fafc] border border-slate-100 outline-none font-bold text-slate-700" placeholder="One-line summary for card" value={editingProduct.shortDescription} onChange={e => setEditingProduct({...editingProduct, shortDescription: e.target.value})} />
                          </div>
                       </div>
                       
                       <div className="space-y-6">
                          <div>
                             <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Deep Description & Tech Specs</label>
                             <textarea rows={10} className="w-full px-8 py-6 rounded-[40px] bg-[#f8fafc] border border-slate-100 outline-none font-bold text-slate-700 resize-none leading-relaxed" placeholder="Detailed feature breakdown, pricing tiers..." value={editingProduct.description} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} />
                          </div>
                       </div>
                    </div>

                    <div className="mt-12 bg-[#f8fafc] p-8 rounded-[48px] border border-slate-100">
                       <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 px-1">Dynamic Feature Bullet List</label>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          {(editingProduct.features || []).map((f, idx) => (
                            <div key={idx} className="flex gap-2">
                               <input type="text" className="flex-grow px-5 py-3 rounded-xl bg-white border border-slate-100 font-bold text-xs" value={f} onChange={e => {
                                 const nf = [...(editingProduct.features || [])];
                                 nf[idx] = e.target.value;
                                 setEditingProduct({...editingProduct, features: nf});
                               }} />
                               <button onClick={() => setEditingProduct({...editingProduct, features: (editingProduct.features || []).filter((_, i) => i !== idx)})} className="text-red-400 p-2 font-black">×</button>
                            </div>
                          ))}
                       </div>
                       <button onClick={() => setEditingProduct({...editingProduct, features: [...(editingProduct.features || []), '']})} className="px-6 py-2 bg-white border border-slate-200 rounded-full font-black text-[9px] uppercase tracking-widest text-blue-600 hover:border-blue-400 hover:text-blue-700 transition-all">+ ADD FEATURE POINT</button>
                    </div>

                    <div className="mt-12 mb-12">
                       <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 px-1">Media Gallery (Upload Images)</label>
                       <div className="flex flex-wrap gap-5">
                          {(editingProduct.images || []).map((img, idx) => (
                            <div key={idx} className="w-24 h-24 rounded-2xl bg-slate-100 relative group overflow-hidden shadow-sm border border-slate-200">
                               <img src={img} className="w-full h-full object-cover" />
                               <button onClick={() => setEditingProduct({...editingProduct, images: (editingProduct.images || []).filter((_, i) => i !== idx)})} className="absolute inset-0 bg-red-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-black text-[10px]">REMOVE</button>
                            </div>
                          ))}
                          <label className="w-24 h-24 rounded-2xl border-2 border-dashed border-slate-300 bg-[#f8fafc] flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/20 transition-all group">
                             <span className="text-2xl text-slate-300 group-hover:text-blue-400">+</span>
                             <span className="text-[8px] font-black text-slate-400 uppercase group-hover:text-blue-500">UPLOAD</span>
                             <input type="file" className="hidden" accept="image/*" onChange={e => handleImageUpload(e, url => setEditingProduct({...editingProduct, images: [...(editingProduct.images || []), url]}))} />
                          </label>
                       </div>
                       <p className="text-[9px] font-bold text-slate-400 mt-4 uppercase tracking-widest">First image will be the primary catalog thumbnail.</p>
                    </div>

                    <div className="flex gap-4">
                       <button onClick={() => setIsProductModalOpen(false)} className="flex-1 py-5 bg-slate-100 text-slate-500 rounded-3xl font-black uppercase text-xs tracking-widest hover:bg-slate-200 transition-all">Discard Changes</button>
                       <button onClick={saveProduct} className="flex-[2] py-5 bg-[#2563eb] text-white rounded-3xl font-black uppercase text-xs tracking-widest shadow-xl shadow-blue-600/30 hover:bg-blue-700 transition-all">Publish to Marketplace</button>
                    </div>
                 </div>
               </div>
             )}
          </div>
        );

      case 'CATEGORIES':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-white p-12 rounded-[56px] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h2 className="text-3xl font-black text-[#1e293b] tracking-tight">Market Segments</h2>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Manage global industry solution categories.</p>
              </div>
              <button onClick={() => setIsCategoryModalOpen(true)} className="px-10 py-4 bg-[#2563eb] text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl hover:bg-blue-700 transition-all">
                + NEW SEGMENT
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map(c => (
                <div key={c} className="bg-white px-10 py-8 rounded-[40px] border border-slate-100 flex items-center justify-between group hover:shadow-2xl transition-all duration-300">
                  <span className="font-black text-xs uppercase tracking-widest text-[#1e293b]">{c}</span>
                  <button onClick={() => setCategories(categories.filter(item => item !== c))} className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-black hover:bg-red-100">×</button>
                </div>
              ))}
            </div>
            {isCategoryModalOpen && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                <div className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-md" onClick={() => setIsCategoryModalOpen(false)}></div>
                <div className="bg-white rounded-[48px] p-12 w-full max-w-md relative animate-in zoom-in-95">
                   <h3 className="text-2xl font-black mb-8 text-[#1e293b] tracking-tight">Add New Solution Category</h3>
                   <input type="text" className="w-full px-6 py-5 rounded-2xl bg-[#f8fafc] border border-slate-100 outline-none font-bold mb-10 text-slate-700 focus:bg-white focus:border-blue-400 transition-all" placeholder="e.g. Cybersecurity Solutions" value={categoryInputValue} onChange={e => setCategoryInputValue(e.target.value)} />
                   <div className="flex gap-4">
                      <button onClick={() => setIsCategoryModalOpen(false)} className="flex-1 py-4 bg-slate-100 text-slate-400 rounded-2xl font-black uppercase text-[10px] tracking-widest">Cancel</button>
                      <button onClick={saveCategory} className="flex-[2] py-4 bg-[#2563eb] text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-blue-600/20">Save Category</button>
                   </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'LOGOS':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-white p-12 rounded-[56px] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
               <div>
                 <h2 className="text-3xl font-black text-[#1e293b] tracking-tight">Marquee Partner Logos</h2>
                 <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Sellers displayed in the homepage slider.</p>
               </div>
               <button onClick={() => { setEditingLogo({ name: '', image: '' }); setIsLogoModalOpen(true); }} className="px-10 py-4 bg-[#2563eb] text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl hover:bg-blue-700">
                 + ADD LOGO
               </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
               {vendorLogos.map(l => (
                 <div key={l.id} className="bg-white p-8 rounded-[48px] border border-slate-50 shadow-sm flex flex-col items-center group relative h-48 justify-center hover:shadow-2xl transition-all duration-500">
                    <img src={l.image} className="max-h-16 max-w-full object-contain mb-4 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                    <p className="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em] group-hover:text-blue-500">{l.name}</p>
                    <button onClick={() => setVendorLogos(vendorLogos.filter(item => item.id !== l.id))} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-black hover:bg-red-100">×</button>
                 </div>
               ))}
            </div>
            {isLogoModalOpen && editingLogo && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                 <div className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-md" onClick={() => setIsLogoModalOpen(false)}></div>
                 <div className="bg-white rounded-[48px] p-12 w-full max-w-md relative animate-in zoom-in-95">
                    <h3 className="text-2xl font-black mb-8 text-[#1e293b]">Upload Brand Asset</h3>
                    <div className="space-y-6">
                       <input type="text" className="w-full px-6 py-5 rounded-2xl bg-[#f8fafc] border border-slate-100 outline-none font-bold text-slate-700" placeholder="Brand Name" value={editingLogo.name} onChange={e => setEditingLogo({...editingLogo, name: e.target.value})} />
                       <label className="block w-full py-16 border-2 border-dashed border-slate-200 rounded-[32px] text-center bg-[#f8fafc] cursor-pointer hover:bg-slate-50 hover:border-blue-400 transition-all overflow-hidden relative group">
                          {editingLogo.image ? (
                             <img src={editingLogo.image} className="h-14 mx-auto object-contain" />
                          ) : (
                             <div className="flex flex-col items-center">
                                <span className="text-3xl text-slate-300 group-hover:text-blue-400 mb-2">+</span>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-blue-600">Select Logo File</span>
                             </div>
                          )}
                          <input type="file" className="hidden" accept="image/*" onChange={e => handleImageUpload(e, url => setEditingLogo({...editingLogo, image: url}))} />
                       </label>
                       <button onClick={saveLogo} className="w-full py-5 bg-[#2563eb] text-white rounded-3xl font-black uppercase text-xs tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all">Submit to Marquee</button>
                    </div>
                 </div>
              </div>
            )}
          </div>
        );

      case 'VENDORS':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-white p-12 rounded-[56px] border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h2 className="text-3xl font-black text-[#1e293b] tracking-tight">Verified Partners</h2>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Manage ecosystem solution providers.</p>
              </div>
              <button onClick={() => { setEditingVendor({ companyName: '', name: '', email: '', verified: false }); setIsVendorModalOpen(true); }} className="px-10 py-4 bg-[#2563eb] text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl hover:bg-blue-700 transition-all">
                + ADD PARTNER
              </button>
            </div>
            <div className="bg-white rounded-[56px] border border-slate-100 overflow-hidden shadow-sm">
               <table className="w-full text-left">
                  <thead className="bg-[#f8fafc] border-b border-slate-100">
                    <tr>
                      <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Company / Org Identity</th>
                      <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Verification</th>
                      <th className="px-12 py-8 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {vendors.map(v => (
                      <tr key={v.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-12 py-10">
                          <p className="font-black text-[#1e293b] text-lg">{v.companyName}</p>
                          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-1">{v.name} • {v.email}</p>
                        </td>
                        <td className="px-12 py-10">
                           <span className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${v.verified ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-[#f8fafc] text-slate-400 border-slate-200'}`}>
                              {v.verified ? 'VERIFIED PARTNER ✓' : 'PENDING AUDIT'}
                           </span>
                        </td>
                        <td className="px-12 py-10 text-right space-x-6">
                           <button onClick={() => { setEditingVendor(v); setIsVendorModalOpen(true); }} className="text-[11px] font-black uppercase text-blue-600 tracking-widest hover:text-blue-800 transition-colors">EDIT PROFILE</button>
                           <button onClick={() => setVendors(vendors.filter(item => item.id !== v.id))} className="text-[11px] font-black uppercase text-red-500 tracking-widest hover:text-red-700">REMOVE</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
            {isVendorModalOpen && editingVendor && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                <div className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-md" onClick={() => setIsVendorModalOpen(false)}></div>
                <div className="bg-white rounded-[48px] p-12 w-full max-w-md relative animate-in zoom-in-95">
                   <h3 className="text-2xl font-black mb-10 text-[#1e293b]">Ecosystem Partner Data</h3>
                   <div className="space-y-5 mb-12">
                      <input type="text" className="w-full px-6 py-5 rounded-2xl bg-[#f8fafc] border border-slate-100 font-bold text-slate-700 outline-none" placeholder="Official Company Name" value={editingVendor.companyName} onChange={e => setEditingVendor({...editingVendor, companyName: e.target.value})} />
                      <input type="text" className="w-full px-6 py-5 rounded-2xl bg-[#f8fafc] border border-slate-100 font-bold text-slate-700 outline-none" placeholder="Business Contact Email" value={editingVendor.email} onChange={e => setEditingVendor({...editingVendor, email: e.target.value})} />
                      <label className="flex items-center gap-4 p-6 bg-[#f8fafc] rounded-3xl cursor-pointer hover:bg-slate-100 transition-all border border-slate-100">
                         <input type="checkbox" checked={editingVendor.verified} onChange={e => setEditingVendor({...editingVendor, verified: e.target.checked})} className="w-6 h-6 rounded-lg border-slate-300 text-blue-600 focus:ring-blue-500" />
                         <span className="text-[11px] font-black uppercase text-slate-500 tracking-widest">Verify Provider for Public Feed</span>
                      </label>
                   </div>
                   <button onClick={saveVendor} className="w-full py-5 bg-[#2563eb] text-white rounded-3xl font-black uppercase text-xs tracking-widest shadow-2xl shadow-blue-600/20 hover:bg-blue-700 transition-all">Update Partner Database</button>
                </div>
              </div>
            )}
          </div>
        );

      case 'BLOGS':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
             <div className="bg-white p-12 rounded-[56px] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <h2 className="text-3xl font-black text-[#1e293b] tracking-tight">Marketplace Insights</h2>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Manage enterprise resources and tutorials.</p>
                </div>
                <button onClick={() => { setEditingBlog({ title: '', category: 'Insights', content: '', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200' }); setIsBlogModalOpen(true); }} className="px-10 py-4 bg-[#2563eb] text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl">
                  + NEW ARTICLE
                </button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogs.map(b => (
                  <div key={b.id} className="bg-white rounded-[56px] border border-slate-100 overflow-hidden flex flex-col sm:flex-row group hover:shadow-2xl transition-all duration-500 p-2">
                     <div className="w-full sm:w-44 h-44 overflow-hidden rounded-[40px] bg-slate-100 flex-shrink-0">
                        <img src={b.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                     </div>
                     <div className="p-8 flex flex-col flex-grow">
                        <h3 className="text-xl font-black text-[#1e293b] mb-2 line-clamp-2">{b.title}</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-8">{b.date} • {b.category}</p>
                        <div className="flex gap-3 mt-auto">
                           <button onClick={() => { setEditingBlog(b); setIsBlogModalOpen(true); }} className="flex-1 py-3 bg-[#f8fafc] rounded-xl text-[10px] font-black uppercase hover:bg-indigo-50 hover:text-blue-600 transition-all tracking-widest">EDIT</button>
                           <button onClick={() => setBlogs(blogs.filter(item => item.id !== b.id))} className="px-5 py-3 bg-[#fff1f2] text-red-500 rounded-xl font-black text-[10px] uppercase transition-all tracking-widest">DEL</button>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="pt-24 pb-32 min-h-screen bg-[#fcfdff] font-['Plus_Jakarta_Sans']">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar - Direct Screenshot Matching */}
          <div className="w-full lg:w-[380px] flex-shrink-0">
            <div className="bg-white rounded-[56px] pt-16 pb-12 px-12 border border-slate-100 shadow-2xl shadow-slate-200/40 sticky top-32 flex flex-col items-center">
              
              {/* Profile Header */}
              <div className="mb-14 text-center">
                <div className="w-24 h-24 rounded-full bg-[#2563eb] mx-auto flex items-center justify-center text-white text-5xl font-black mb-8 shadow-2xl shadow-blue-600/40 border-4 border-white">
                  A
                </div>
                <h2 className="text-2xl font-black text-[#1e293b] tracking-tight mb-3">Super Admin</h2>
                <div className="inline-block px-6 py-2.5 bg-[#eff6ff] rounded-full border border-blue-100">
                  <span className="text-[10px] font-black uppercase text-[#2563eb] tracking-[0.2em]">AUTHORIZED ACCESS</span>
                </div>
              </div>

              {/* Navigation List */}
              <nav className="w-full space-y-3 mb-16">
                {[
                  { id: 'OVERVIEW', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z' },
                  { id: 'LEADS', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
                  { id: 'PRODUCTS', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
                  { id: 'CATEGORIES', icon: 'M4 6h16M4 12h16M4 18h7' },
                  { id: 'LOGOS', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
                  { id: 'VENDORS', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
                  { id: 'BLOGS', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v12a2 2 0 01-2 2z' }
                ].map(item => (
                  <button 
                    key={item.id} 
                    onClick={() => setActiveTab(item.id)} 
                    className={`w-full text-left px-10 py-5 rounded-[28px] font-black text-[13px] uppercase tracking-[0.25em] transition-all flex items-center gap-6 ${activeTab === item.id ? 'bg-[#0f172a] text-white shadow-2xl scale-[1.03]' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={item.icon}></path></svg>
                    {item.id}
                  </button>
                ))}
              </nav>

              {/* Logout Button */}
              <button 
                onClick={onLogout} 
                className="w-full py-6 bg-[#fff1f2] text-[#e11d48] rounded-full font-black text-[12px] uppercase tracking-[0.25em] transition-all hover:bg-[#ffe4e6] flex items-center justify-center active:scale-95 border border-red-50"
              >
                LOGOUT SYSTEM
              </button>
            </div>
          </div>

          {/* Main Workspace Area */}
          <div className="flex-grow min-w-0">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
