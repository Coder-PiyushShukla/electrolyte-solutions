import React from 'react';
import Navbar from './navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-cyber-black text-gray-200 font-sans selection:bg-cyber-primary/30 selection:text-white">
      
      {/* The New Top-Level Command Deck */}
      <Navbar />

      {/* Main Content Area 
          pt-24: Pushes content down so it's not hidden behind the fixed Navbar 
          max-w-7xl: Keeps the dashboard centered on ultra-wide screens
      */}
      <main className="pt-24 px-4 pb-8 max-w-7xl mx-auto min-h-screen relative z-0">
        
        {/* Cinematic Background Glow (Ambient Lighting) */}
        <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyber-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />
        
        {children}
      </main>
    </div>
  );
};

export default Layout;