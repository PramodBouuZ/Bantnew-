
import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import LeadWizard from './pages/LeadWizard';
import Blog from './pages/Blog';
import AdminDashboard from './pages/AdminDashboard';
import AboutUs from './pages/AboutUs';
import FAQ from './pages/FAQ';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import VendorRegistration from './pages/VendorRegistration';
import JsonLd from './components/JsonLd';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('isAdmin') === 'true';
  });
  
  // Site Settings
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('siteSettings');
    return saved ? JSON.parse(saved) : {
      logoText: 'BANTConfirm',
      logoColor: '#2563eb',
      logoImage: '',
      favicon: 'https://cdn-icons-png.flaticon.com/512/2092/2092063.png',
      whatsappApiKey: '',
      whatsappInstanceId: '',
      notifyAdminEmail: true,
      notifyAdminWhatsApp: false,
      notifyUserPost: true,
      notifyVendorLead: true,
      notifyUserLogin: true,
      metaDescription: "Verified B2B marketplace for MSMEs and Enterprises. Software, IT Hardware, and Telecom solutions qualified with AI-driven BANT matching.",
      metaKeywords: "B2B Marketplace, India IT, MSME Software, BANT Qualification, Enterprise IT Procurement",
      socialLinks: {
        linkedin: 'https://linkedin.com',
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com'
      }
    };
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('siteSettings', JSON.stringify(settings));
    
    // Update Favicon
    const link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
    if (link) {
      link.href = settings.favicon;
    } else {
      const newLink = document.createElement('link');
      newLink.rel = 'icon';
      newLink.href = settings.favicon;
      document.head.appendChild(newLink);
    }

    // Update SEO Meta
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', settings.metaDescription);
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', settings.metaKeywords);

  }, [settings]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      if (email === 'info.bouuz@gmail.com' && password === 'AdminAccess2025') {
        sessionStorage.setItem('isAdmin', 'true');
        setIsAuthenticated(true);
        setError('');
        setIsLoggingIn(false);
        navigate('/admin');
        
        if (settings.notifyUserLogin) {
          console.log('Admin Login Alert: Security notification triggered.');
        }
      } else {
        setError('Invalid business credentials.');
        setIsLoggingIn(false);
      }
    }, 600);
  };

  const quickLogin = () => {
    sessionStorage.setItem('isAdmin', 'true');
    setIsAuthenticated(true);
    navigate('/admin');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isAdmin');
    setIsAuthenticated(false);
    navigate('/user-login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent selection:bg-blue-100 selection:text-blue-900">
      <ScrollToTop />
      <Navbar 
        isAuthenticated={isAuthenticated} 
        onLogout={handleLogout} 
        logoText={settings.logoText} 
        logoColor={settings.logoColor}
        logoImage={settings.logoImage}
      />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/lead-wizard" element={<LeadWizard />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/user-signup" element={<UserSignup />} />
          <Route path="/vendor-registration" element={<VendorRegistration />} />
          <Route 
            path="/admin" 
            element={isAuthenticated ? <AdminDashboard onLogout={handleLogout} settings={settings} setSettings={setSettings} /> : <Navigate to="/login" />} 
          />
          <Route path="/login" element={
            <div className="pt-48 pb-40 text-center px-4">
              <div className="max-w-md mx-auto bg-white p-10 rounded-[40px] border border-slate-100 shadow-2xl">
                <div className="mb-8">
                  <div className="w-16 h-16 bg-blue-600 rounded-3xl mx-auto flex items-center justify-center text-white shadow-xl mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  </div>
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">Admin Portal</h1>
                  <p className="text-slate-500 font-medium text-xs mt-2 uppercase tracking-widest">Authorized Access Only</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-4 text-left">
                  {error && <p className="text-xs font-black text-red-600 bg-red-50 p-3 rounded-xl border border-red-100 mb-4 text-center">{error}</p>}
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Email</label>
                    <input type="email" placeholder="info.bouuz@gmail.com" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none font-bold" value={email} onChange={e => setEmail(e.target.value)} required />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none font-bold" value={password} onChange={e => setPassword(e.target.value)} required />
                  </div>
                  <button type="submit" disabled={isLoggingIn} className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black shadow-lg hover:bg-black transition-all uppercase tracking-widest text-xs mt-4">
                    {isLoggingIn ? 'Authenticating...' : 'Sign In'}
                  </button>
                </form>
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <button onClick={quickLogin} className="w-full py-3 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
                    Bypass for Demo: Admin Access
                  </button>
                </div>
              </div>
            </div>
          } />
        </Routes>
      </main>
      <Footer socialLinks={settings.socialLinks} logoText={settings.logoText} logoColor={settings.logoColor} logoImage={settings.logoImage} />
    </div>
  );
};

export default App;
