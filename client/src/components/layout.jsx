import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Box, Settings, Activity, Zap } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, to }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `relative flex items-center gap-4 px-6 py-4 transition-all duration-300 group
      ${isActive ? 'text-cyber-primary' : 'text-gray-400 hover:text-white'}`
    }
  >
    {({ isActive }) => (
      <>
        {/* Active Indicator Line */}
        {isActive && (
          <motion.div
            layoutId="active-pill"
            className="absolute left-0 top-0 bottom-0 w-1 bg-cyber-primary shadow-[0_0_15px_#facc15]"
          />
        )}
        <Icon size={20} className={`transition-transform duration-300 ${isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]' : 'group-hover:scale-110'}`} />
        <span className="font-mono text-sm tracking-wider">{label}</span>
      </>
    )}
  </NavLink>
);

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Glass Sidebar */}
      <motion.aside 
        initial={{ x: -100 }} 
        animate={{ x: 0 }}
        className="fixed w-64 h-full bg-cyber-dark/80 backdrop-blur-xl border-r border-white/5 z-50 hidden md:block"
      >
        <div className="p-8 border-b border-white/5">
          <h1 className="text-2xl font-bold font-mono tracking-tighter text-white flex items-center gap-2">
            <Zap className="text-cyber-primary fill-cyber-primary" />
            INVICTUS<span className="text-xs align-top opacity-50">OS</span>
          </h1>
        </div>
        <nav className="mt-8 flex flex-col gap-2">
          <SidebarItem to="/" icon={LayoutDashboard} label="OVERVIEW" />
          <SidebarItem to="/inventory" icon={Box} label="INVENTORY" />
          <SidebarItem to="/production" icon={Activity} label="PRODUCTION" />
          <SidebarItem to="/settings" icon={Settings} label="SYSTEM" />
        </nav>
        
        {/* System Status Footer */}
        <div className="absolute bottom-0 w-full p-6 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-mono text-gray-500">SYSTEM ONLINE</span>
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;