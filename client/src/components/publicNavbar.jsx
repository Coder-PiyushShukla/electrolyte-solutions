import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, Menu, X, ChevronRight } from 'lucide-react';

const PublicNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Dynamic Background Opacity based on scroll
  const navBackground = useTransform(
    scrollY, 
    [0, 50], 
    ['rgba(5, 5, 5, 0)', 'rgba(5, 5, 5, 0.8)']
  );
  
  const navBackdrop = useTransform(
    scrollY,
    [0, 50],
    ['blur(0px)', 'blur(12px)']
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      style={{ backgroundColor: navBackground, backdropFilter: navBackdrop }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'border-white/10' : 'border-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-cyber-primary rounded-lg flex items-center justify-center text-black">
            <Zap size={18} fill="currentColor" />
          </div>
          <span className="text-xl font-bold font-mono tracking-tighter text-white">
            INVICTUS<span className="text-cyber-primary">.OS</span>
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8">
          {['Features', 'Solution', 'Pricing', 'Docs'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyber-primary transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* AUTH BUTTONS */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/sign-in" className="text-sm font-bold text-white hover:text-cyber-primary transition-colors">
            LOG IN
          </Link>
          <Link 
            to="/sign-up" 
            className="px-5 py-2.5 bg-white text-black font-bold text-sm rounded-lg hover:bg-cyber-primary transition-all flex items-center gap-2 group"
          >
            GET STARTED
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 left-0 w-full bg-cyber-black border-b border-white/10 p-6 flex flex-col gap-4 md:hidden"
        >
          {['Features', 'Solution', 'Pricing'].map((item) => (
            <a key={item} href="#" className="text-gray-300 hover:text-white py-2">{item}</a>
          ))}
          <div className="h-[1px] bg-white/10 my-2" />
          <Link to="/sign-in" className="text-center py-3 text-white">Log In</Link>
          <Link to="/sign-up" className="bg-cyber-primary text-black py-3 rounded-lg text-center font-bold">Get Started</Link>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default PublicNavbar;