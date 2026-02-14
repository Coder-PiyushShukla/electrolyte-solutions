import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle, TrendingUp, Package, Activity } from 'lucide-react';

const data = [
  { name: '00:00', uv: 4000 }, { name: '04:00', uv: 3000 },
  { name: '08:00', uv: 2000 }, { name: '12:00', uv: 2780 },
  { name: '16:00', uv: 1890 }, { name: '20:00', uv: 2390 },
];

const StatCard = ({ title, value, subtext, icon: Icon, color }) => (
  <motion.div 
    whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)' }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-cyber-gray/50 backdrop-blur-md border border-white/5 p-6 rounded-xl relative overflow-hidden group"
  >
    <div className={`absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity duration-500 ${color}`}>
      <Icon size={40} />
    </div>
    <h3 className="text-gray-400 text-sm font-mono mb-2 uppercase tracking-widest">{title}</h3>
    <div className="text-3xl font-bold text-white mb-1 flex items-baseline gap-2">
      {value}
    </div>
    <p className={`text-xs font-mono ${color === 'text-cyber-danger' ? 'text-red-400' : 'text-emerald-400'}`}>
      {subtext}
    </p>
  </motion.div>
);

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold text-white mb-2"
          >
            Factory Status
          </motion.h2>
          <p className="text-gray-400 font-mono text-sm">Real-time telemetry from Floor 1</p>
        </div>
        <button className="bg-cyber-primary text-cyber-black font-bold font-mono px-6 py-2 rounded hover:bg-yellow-300 transition-colors">
          + NEW BATCH
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Stock" value="12,450" subtext="+2.5% from yesterday" icon={Package} color="text-cyber-neon" />
        <StatCard title="Efficiency" value="94.2%" subtext="Optimal Levels" icon={Activity} color="text-emerald-500" />
        <StatCard title="Low Stock Alerts" value="03" subtext="Attention Required" icon={AlertTriangle} color="text-cyber-danger" />
        <StatCard title="Production" value="850" subtext="Units today" icon={TrendingUp} color="text-cyber-primary" />
      </div>

      {/* Main Chart Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-cyber-gray/30 border border-white/5 rounded-2xl p-6 h-[400px] relative"
      >
        <h3 className="text-xl font-bold text-white mb-6 font-mono flex items-center gap-2">
          <span className="w-2 h-2 bg-cyber-neon rounded-full animate-pulse"></span>
          CONSUMPTION ANALYTICS
        </h3>
        <ResponsiveContainer width="100%" height="85%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="#525252" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#525252" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#333', borderRadius: '8px' }}
              itemStyle={{ color: '#00f0ff' }}
            />
            <Area type="monotone" dataKey="uv" stroke="#00f0ff" strokeWidth={3} fillOpacity={1} fill="url(#colorUv)" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default Dashboard;