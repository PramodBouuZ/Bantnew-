
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
  logoText?: string;
  logoColor?: string;
  logoImage?: string;
}

const Navbar: React.FC<NavbarProps> = ({ 
  isAuthenticated, 
  onLogout, 
  logoText = 'BANTConfirm', 
  logoColor = '#2563eb',
  logoImage
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    const checkUser = () => {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(null);
      }
    };
    
    checkUser();
    window.addEventListener('storage', checkUser);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', checkUser);
    };
  }, [location.pathname]);

  const navLinks = [
    { name: 'Solutions', path: '/products' },
    { name: 'Insights', path: '/blog' },
    ...(isAuthenticated ? [{ name: 'Admin Dashboard', path: '/admin' }] : []),
  ];

  const handleUserLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    if (onLogout && isAuthenticated) {
        onLogout();
    }
    window.location.reload();
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'pt-2' : 'pt-4'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className={`glass rounded-full px-5 py-2.5 md:py-3.5 flex items-center justify-between shadow-2xl transition-all ${isScrolled ? 'shadow-blue-500/10' : 'shadow-none'}`}>
            <Link to="/" className="flex items-center gap-1 group">
              {logoImage ? (
                <img src={logoImage} className="h-8 md:h-10 object-contain" alt={logoText} />
              ) : (
                <span className="text-lg md:text-2xl font-black tracking-tighter transition-transform active:scale-95">
                  <span className="text-blue-600">{logoText.slice(0, 4)}</span><span className="text-yellow-500">{logoText.slice(4)}</span>
                </span>
              )}
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-bold transition-all hover:text-blue-600 ${location.pathname === link.path ? 'text-blue-600' : 'text-slate-600'}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <div className="hidden sm:flex items-center gap-4 border-r border-slate-200 pr-4 mr-1">
                {isAuthenticated || user ? (
                  <div className="flex items-center gap-4">
                    {user && !isAuthenticated && (
                        <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">Hi, {user.name.split(' ')[0]}</span>
                    )}
                    <button onClick={handleUserLogout} className="text-xs font-black text-slate-500 hover:text-red-600 transition-colors uppercase tracking-widest">Logout</button>
                  </div>
                ) : (
                  <>
                    <Link to="/user-login" className="text-xs font-black text-slate-500 hover:text-blue-600 uppercase tracking-widest transition-colors">Login</Link>
                    <Link to="/user-signup" className="px-5 py-2.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">Join</Link>
                  </>
                )}
              </div>
              <Link to="/lead-wizard" className="bg-amber-400 text-slate-900 px-4 md:px-6 py-2.5 md:py-3.5 rounded-full text-[10px] md:text-xs font-black shadow-lg shadow-amber-400/20 hover:bg-amber-500 transition-all active:scale-95 whitespace-nowrap uppercase tracking-widest">
                Post Req
              </Link>
              <button className="lg:hidden p-2 text-slate-600 transition-transform active:scale-90" onClick={() => setIsMenuOpen(true)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
            <div className="absolute top-0 right-0 h-full w-[280px] bg-white p-8 shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
                <div className="flex justify-between items-center mb-12">
                   <span className="text-lg font-black text-slate-900 tracking-tighter">Menu</span>
                   <button onClick={() => setIsMenuOpen(false)} className="p-2 text-slate-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                   </button>
                </div>

                <div className="flex flex-col gap-8">
                    {navLinks.map((link) => (
                        <Link key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)} className="text-2xl font-black text-slate-900 tracking-tight hover:text-blue-600 transition-colors">{link.name}</Link>
                    ))}
                    <hr className="border-slate-100" />
                    {!user && !isAuthenticated ? (
                        <div className="flex flex-col gap-6">
                            <Link to="/user-login" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-slate-600">Login</Link>
                            <Link to="/user-signup" onClick={() => setIsMenuOpen(false)} className="py-5 bg-blue-600 text-white rounded-2xl text-center font-black uppercase tracking-[0.2em] text-xs">Sign Up Now</Link>
                        </div>
                    ) : (
                        <button onClick={handleUserLogout} className="text-lg font-black text-red-600 text-left uppercase tracking-widest">Sign Out</button>
                    )}
                </div>

                <div className="mt-auto pt-8 border-t border-slate-100">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4">India's Smartest B2B AI Marketplace</p>
                    <div className="flex gap-4">
                       <div className="w-8 h-8 rounded-lg bg-slate-100"></div>
                       <div className="w-8 h-8 rounded-lg bg-slate-100"></div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
