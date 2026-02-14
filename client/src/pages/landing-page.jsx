import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle, 
  Layers, 
  Cpu, 
  Activity, 
  Zap,
  Globe,
  ShieldCheck,
  Terminal,
  Code2,
  Database
} from 'lucide-react';
import PublicNavbar from '../components/public-navbar';

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
    <div className="min-h-screen bg-cyber-black text-white selection:bg-cyber-primary/30 scroll-smooth">
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

      {/* --- SOLUTION (HOW IT WORKS) --- */}
      <section id="solution" className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">From Design to Assembly, <br /> <span className="text-cyber-primary">Seamlessly.</span></h2>
              <div className="space-y-8 mt-10">
                {[
                  { title: "1. Define Blueprint", desc: "Upload your PCB Bill of Materials (BOM) directly." },
                  { title: "2. Initiate Production", desc: "Select batch size. Invictus checks stock feasibility instantly." },
                  { title: "3. Auto-Deduction", desc: "Inventory updates in real-time. Wastage is tracked automatically." },
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-mono font-bold text-cyber-primary">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{step.title}</h4>
                      <p className="text-gray-400">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-cyber-primary/20 blur-[80px] -z-10" />
              <div className="bg-cyber-gray border border-white/10 rounded-2xl p-2 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="bg-black/80 rounded-xl overflow-hidden h-[400px] flex items-center justify-center text-gray-500 font-mono">
                  [Interactive Simulation UI Placeholder]
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRICING --- */}
      <section id="pricing" className="py-24 bg-black/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Industrial Pricing</h2>
            <p className="text-gray-400">Scale your operations without breaking the bank.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Starter", price: "$0", desc: "For Hackathons & MVP", features: ["100 Components", "Basic Analytics", "Single Admin"] },
              { name: "Professional", price: "$499", desc: "For Growing Factories", features: ["Unlimited Stock", "AI Procurement", "Priority Support", "Excel Export"] },
              { name: "Enterprise", price: "Custom", desc: "For Global Supply Chains", features: ["Custom ERP Integrations", "On-Premise Deployment", "24/7 SLA", "Dedicated Account Manager"] }
            ].map((plan, i) => (
              <div key={i} className={`p-8 rounded-2xl border ${i === 1 ? 'border-cyber-primary bg-cyber-primary/5' : 'border-white/10 bg-white/5'} flex flex-col`}>
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-2 font-mono">{plan.price}<span className="text-lg text-gray-500 font-sans font-normal">/mo</span></div>
                <p className="text-gray-400 mb-8 text-sm">{plan.desc}</p>
                <div className="space-y-4 mb-8 flex-1">
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm">
                      <CheckCircle size={16} className={i === 1 ? "text-cyber-primary" : "text-gray-500"} />
                      {f}
                    </div>
                  ))}
                </div>
                <button className={`w-full py-3 rounded-lg font-bold transition-all ${i === 1 ? 'bg-cyber-primary text-black hover:bg-yellow-300' : 'bg-white/10 hover:bg-white/20'}`}>
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- DOCS (API SECTION) --- */}
      <section id="docs" className="py-24 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 bg-[#0d1117] rounded-xl border border-white/10 p-4 font-mono text-sm overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-gray-500 text-xs">api_test.js</span>
              </div>
              <div className="text-green-400">
                <span className="text-purple-400">const</span> response = <span className="text-purple-400">await</span> fetch(<span className="text-orange-300">"https://api.invictus.os/v1/deduct"</span>, {'{'} <br/>
                &nbsp;&nbsp;method: <span className="text-orange-300">"POST"</span>,<br/>
                &nbsp;&nbsp;body: JSON.stringify({'{'}<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;pcb_id: <span className="text-blue-400">"MB-ALPHA-V2"</span>,<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;quantity: <span className="text-blue-400">500</span><br/>
                &nbsp;&nbsp;{'}'})<br/>
                {'}'});<br/>
                <br/>
                console.log(<span className="text-purple-400">await</span> response.json());
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 text-gray-400">
                {'>'} {'{'} "status": "success", "stock_remaining": 450, "alert": "low_stock" {'}'}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 mb-6">
                <Code2 size={12} /> DEVELOPER FIRST
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Built for Integration</h2>
              <p className="text-gray-400 text-lg mb-8">
                Invictus isn't just a dashboard. It's a headless inventory engine. 
                Connect your existing ERP, MES, or custom scripts instantly with our REST API.
              </p>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 text-white hover:text-cyber-primary transition-colors font-bold">
                  View Documentation <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
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