import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle, 
  Layers, 
  Cpu, 
  Activity, 
  BarChart3, 
  ShieldCheck, 
  Globe 
} from 'lucide-react';
import PublicNavbar from '../components/publicNavbar';

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-cyber-black text-white selection:bg-cyber-primary/30">
      <PublicNavbar />
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-cyber-primary/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-cyber-neon/5 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyber-primary mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-primary"></span>
              </span>
              INVICTUS.OS V1.0 IS LIVE
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
              The Operating System for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
                Modern Manufacturing
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Eliminate manual inventory tracking. Automate procurement. Visualize consumption. 
              Invictus provides the precision tools you need to build the future.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/sign-up" 
                className="w-full sm:w-auto px-8 py-4 bg-cyber-primary text-black font-bold rounded-xl hover:shadow-[0_0_30px_rgba(250,204,21,0.3)] transition-all flex items-center justify-center gap-2 group"
              >
                Start Free Trial
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/sign-in" 
                className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                Live Demo
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero Dashboard Preview (CSS Only Mockup) */}
          <motion.div 
            initial={{ opacity: 0, y: 100, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-20 relative max-w-5xl mx-auto"
            style={{ perspective: '1000px' }}
          >
            <div className="relative bg-cyber-gray border border-white/10 rounded-xl overflow-hidden shadow-2xl">
              <div className="h-8 bg-black/40 border-b border-white/5 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="grid grid-cols-12 gap-0 h-[400px] md:h-[500px] bg-cyber-dark/50">
                {/* Sidebar Mockup */}
                <div className="col-span-2 border-r border-white/5 hidden md:block p-4 space-y-4">
                  <div className="h-8 w-full bg-white/5 rounded" />
                  <div className="h-4 w-3/4 bg-white/5 rounded" />
                  <div className="h-4 w-1/2 bg-white/5 rounded" />
                  <div className="h-4 w-5/6 bg-white/5 rounded" />
                </div>
                {/* Main Content Mockup */}
                <div className="col-span-12 md:col-span-10 p-6 space-y-6">
                  <div className="flex justify-between">
                    <div className="h-10 w-1/3 bg-white/10 rounded" />
                    <div className="h-10 w-32 bg-cyber-primary/20 rounded" />
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                     <div className="h-32 bg-white/5 rounded border border-white/5" />
                     <div className="h-32 bg-white/5 rounded border border-white/5" />
                     <div className="h-32 bg-white/5 rounded border border-white/5" />
                  </div>
                  <div className="h-64 bg-white/5 rounded border border-white/5" />
                </div>
              </div>
            </div>
            {/* Glow underneath */}
            <div className="absolute -inset-10 bg-cyber-primary/20 blur-[60px] -z-10 rounded-[50%]" />
          </motion.div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section id="features" className="py-24 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Precision Engineered Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Built for high-velocity manufacturing teams who demand accuracy at scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Layers,
                title: "Real-Time Inventory",
                desc: "Live tracking of component levels with millisecond precision across multiple warehouses."
              },
              {
                icon: Cpu,
                title: "Automated Procurement",
                desc: "AI-driven triggers automatically generate POs when stock hits safety thresholds."
              },
              {
                icon: Activity,
                title: "Consumption Analytics",
                desc: "Visualize usage patterns and scrap rates to optimize your production efficiency."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 bg-white/5 border border-white/5 rounded-2xl hover:border-cyber-primary/30 transition-all group"
              >
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6 group-hover:bg-cyber-primary group-hover:text-black transition-colors text-white">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SOCIAL PROOF / STATS --- */}
      <section className="py-20 border-y border-white/5 bg-cyber-gray/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
             {[
               { val: "99.9%", label: "Data Accuracy" },
               { val: "24h", label: "Hackathon MVP" },
               { val: "500+", label: "Components Tracked" },
               { val: "0.0s", label: "Latency" }
             ].map((stat, i) => (
               <div key={i}>
                 <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono">{stat.val}</div>
                 <div className="text-sm text-gray-500 uppercase tracking-widest">{stat.label}</div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-cyber-primary/5 -z-10" />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Upgrade Your Factory?</h2>
          <p className="text-xl text-gray-400 mb-10">
            Join the new standard of manufacturing intelligence today.
          </p>
          <Link 
            to="/sign-up" 
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold text-lg rounded-xl hover:bg-cyber-primary transition-all"
          >
            Get Started Now <ArrowRight />
          </Link>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-cyber-primary rounded flex items-center justify-center text-black">
              <Zap size={12} fill="currentColor" />
            </div>
            <span className="font-bold text-gray-300 tracking-tight">INVICTUS.OS</span>
          </div>
          <div className="text-gray-600 text-sm">
            © 2026 Invictus Systems. Built for the Future.
          </div>
          <div className="flex gap-6 text-gray-500">
            <Globe size={20} className="hover:text-white cursor-pointer" />
            <ShieldCheck size={20} className="hover:text-white cursor-pointer" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;