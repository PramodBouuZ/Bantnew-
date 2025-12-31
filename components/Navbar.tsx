
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
    
    // Check for user login
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
      <nav className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-1' : 'py-3'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="glass rounded-full px-4 md:px-8 py-2 md:py-3 flex items-center justify-between shadow-xl shadow-indigo-500/5">
            <Link to="/" className="flex items-center gap-1 group h-10">
              {logoImage ? (
                <img src={logoImage} className="h-full object-contain" alt={logoText} />
              ) : (
                <span className="text-xl md:text-2xl font-black tracking-tighter group-hover:scale-105 transition-transform">
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

            <div className="flex items-center gap-3 md:gap-5">
              <div className="hidden sm:flex items-center gap-4 border-r border-slate-200 pr-5 mr-1">
                {isAuthenticated || user ? (
                  <div className="flex items-center gap-4">
                    {user && !isAuthenticated && (
                        <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Hi, {user.name.split(' ')[0]}</span>
                    )}
                    <button onClick={handleUserLogout} className="text-sm font-bold text-slate-600 hover:text-red-600 transition-colors">Logout</button>
                  </div>
                ) : (
                  <>
                    <Link to="/user-login" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">Login</Link>
                    <Link to="/user-signup" className="px-5 py-2 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">Sign Up</Link>
                  </>
                )}
              </div>
              <Link to="/lead-wizard" className="bg-amber-400 text-slate-900 px-4 md:px-6 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-black shadow-lg shadow-amber-400/20 hover:bg-amber-500 transition-all hover:scale-105 active:scale-95 whitespace-nowrap">
                Post Requirement
              </Link>
              <button className="lg:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsMenuOpen(false)}></div>
            <div className="absolute top-4 left-4 right-4 bg-white rounded-[32px] p-8 shadow-2xl animate-in slide-in-from-top-4">
                <div className="flex flex-col gap-6">
                    {navLinks.map((link) => (
                        <Link key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)} className="text-xl font-black text-slate-900">{link.name}</Link>
                    ))}
                    <hr className="border-slate-100" />
                    {!user && !isAuthenticated ? (
                        <div className="flex flex-col gap-4">
                            <Link to="/user-login" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-slate-600">Login</Link>
                            <Link to="/user-signup" onClick={() => setIsMenuOpen(false)} className="py-4 bg-slate-900 text-white rounded-2xl text-center font-black uppercase tracking-widest">Sign Up</Link>
                        </div>
                    ) : (
                        <button onClick={handleUserLogout} className="text-lg font-bold text-red-600 text-left">Logout</button>
                    )}
                </div>
            </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
