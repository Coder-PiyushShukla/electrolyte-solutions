import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Github, 
  Twitter, 
  Linkedin, 
  Instagram, 
  ArrowRight, 
  Mail, 
  MessageSquare 
} from 'lucide-react';
import FeedbackModal from './FeedbackModal';

const Footer = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  return (
    <>
      <footer className="bg-[#050505] border-t border-white/10 relative overflow-hidden pt-20 pb-10">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber-primary/50 to-transparent" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyber-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* BRAND COLUMN */}
            <div className="space-y-6">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 bg-cyber-primary rounded-lg flex items-center justify-center text-black transition-transform group-hover:rotate-12">
                  <Zap size={18} fill="currentColor" />
                </div>
                <span className="text-xl font-bold font-mono tracking-tighter text-white">
                  INVICTUS<span className="text-cyber-primary">.OS</span>
                </span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed">
                The next-generation operating system for modern manufacturing. 
                Optimizing inventory, production, and logistics with military-grade precision.
              </p>
              <div className="flex gap-4">
                {[Github, Twitter, Linkedin, Instagram].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-cyber-primary transition-all hover:-translate-y-1">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* LINKS COLUMN 1 */}
            <div>
              <h4 className="text-white font-bold mb-6 font-mono">PLATFORM</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                {['Features', 'Integrations', 'Pricing', 'Changelog', 'Docs'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-cyber-primary transition-colors flex items-center gap-2 group">
                      <span className="w-0 group-hover:w-2 h-[1px] bg-cyber-primary transition-all" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* LINKS COLUMN 2 */}
            <div>
              <h4 className="text-white font-bold mb-6 font-mono">COMPANY</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                {['About Us', 'Careers', 'Blog', 'Contact', 'Partners'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-cyber-primary transition-colors flex items-center gap-2 group">
                      <span className="w-0 group-hover:w-2 h-[1px] bg-cyber-primary transition-all" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* NEWSLETTER COLUMN */}
            <div>
              <h4 className="text-white font-bold mb-6 font-mono">STAY UPDATED</h4>
              <p className="text-gray-400 text-sm mb-4">
                Receive the latest system patches and feature rollouts directly to your inbox.
              </p>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyber-primary transition-colors" size={18} />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-12 text-sm text-white focus:outline-none focus:border-cyber-primary transition-colors"
                />
                <button className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-cyber-primary rounded text-black hover:scale-105 transition-transform">
                  <ArrowRight size={16} />
                </button>
              </div>
              
              {/* FEEDBACK TRIGGER */}
              <div className="mt-8 pt-8 border-t border-white/5">
                <button 
                  onClick={() => setIsFeedbackOpen(true)}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
                >
                  <MessageSquare size={16} className="group-hover:text-cyber-primary transition-colors" />
                  <span>Found a bug? Send Feedback</span>
                </button>
              </div>
            </div>

          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs text-gray-500 font-mono">
              © 2026 INVICTUS SYSTEMS INC. ALL RIGHTS RESERVED.
            </div>
            <div className="flex gap-6 text-xs text-gray-500 font-mono">
              <a href="#" className="hover:text-white transition-colors">PRIVACY PROTOCOL</a>
              <a href="#" className="hover:text-white transition-colors">TERMS OF SERVICE</a>
            </div>
          </div>
        </div>
      </footer>

      {/* FEEDBACK MODAL COMPONENT */}
      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
    </>
  );
};

export default Footer;