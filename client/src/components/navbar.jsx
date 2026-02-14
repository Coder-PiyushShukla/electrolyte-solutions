import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Box,
  Activity,
  Settings,
  LogOut,
  Menu,
  X,
  Zap,
  ShieldCheck
} from 'lucide-react';

const NavItem = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <NavLink to={to} className="relative px-4 py-2 group">
      {({ isActive }) => (
        <>
          {/* Hover Glow Effect */}
          <div className="absolute inset-0 bg-cyber-primary/0 group-hover:bg-cyber-primary/5 rounded-lg transition-colors duration-300" />

          {/* Active State: The "Magnetic Pill" */}
          {isActive && (
            <motion.div
              layoutId="nav-pill"
              className="absolute inset-0 bg-white/5 border border-white/10 rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.05)]"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}

          <div className={`relative flex items-center gap-2 z-10 transition-colors duration-200 ${isActive ? 'text-cyber-primary' : 'text-gray-400 group-hover:text-white'}`}>
            <Icon size={18} className={isActive ? 'drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]' : ''} />
            <span className="font-mono text-xs tracking-widest uppercase font-bold">{label}</span>
          </div>

          {/* Bottom Active Line (Optional aesthetic detail) */}
          {isActive && (
            <motion.div
              layoutId="nav-line"
              className="absolute bottom-0 left-2 right-2 h-[2px] bg-cyber-primary shadow-[0_0_10px_#facc15]"
            />
          )}
        </>
      )}
    </NavLink>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // UPDATED: Redirect to the new Sign-In route
    navigate('/sign-in');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-4 py-3">
      {/* The Glass Container */}
      <div className="bg-cyber-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex items-center justify-between px-6 py-3 relative overflow-hidden">

        {/* Animated Background Mesh */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* LOGO SECTION */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyber-primary/10 border border-cyber-primary/20 rounded-lg flex items-center justify-center relative group">
            <Zap className="text-cyber-primary group-hover:scale-110 transition-transform duration-300" size={20} fill="currentColor" />
            <div className="absolute inset-0 bg-cyber-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <h1 className="text-white font-bold font-mono tracking-tighter text-lg leading-none">
              INVICTUS<span className="text-cyber-primary">.OS</span>
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] text-emerald-500 font-mono tracking-widest">SYSTEM ONLINE</span>
            </div>
          </div>
        </div>

        {/* DESKTOP NAVIGATION (Center) */}
        <div className="hidden md:flex items-center gap-2 bg-black/20 p-1 rounded-xl border border-white/5">
          <NavItem to="/dashboard" icon={LayoutDashboard} label="Overview" />
          <NavItem to="/inventory" icon={Box} label="Inventory" />
          <NavItem to="/production" icon={Activity} label="Production" />
          <NavItem to="/settings" icon={Settings} label="System" />
        </div>

        {/* USER PROFILE & LOGOUT (Right) */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-white text-xs font-bold font-mono">ADMIN_USER_01</span>
            <span className="text-gray-500 text-[10px] font-mono flex items-center gap-1">
              <ShieldCheck size={10} className="text-cyber-primary" /> CLEARANCE LEVEL 5
            </span>
          </div>
          <div className="h-8 w-[1px] bg-white/10" />
          <button
            onClick={handleLogout}
            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all group relative"
            title="Disconnect"
          >
            <LogOut size={20} />
            <span className="absolute top-full right-0 mt-2 px-2 py-1 bg-black border border-red-500/30 text-red-500 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              DISCONNECT
            </span>
          </button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-20 left-4 right-4 bg-cyber-gray/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 z-40 flex flex-col gap-2 md:hidden shadow-2xl"
          >
            <NavItem to="/dashboard" icon={LayoutDashboard} label="Overview" />
            <NavItem to="/inventory" icon={Box} label="Inventory" />
            <NavItem to="/production" icon={Activity} label="Production" />
            <NavItem to="/settings" icon={Settings} label="System" />
            <div className="h-[1px] bg-white/10 my-2" />
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-mono text-xs font-bold"
            >
              <LogOut size={18} /> DISCONNECT SESSION
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;