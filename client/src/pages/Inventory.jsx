import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, AlertCircle, CheckCircle } from 'lucide-react';

const inventoryItems = [
  { id: 1, name: 'Capacitor 10µF', part: 'CP-10UF-001', stock: 4500, min: 1000, status: 'good' },
  { id: 2, name: 'Resistor 10kΩ', part: 'RS-10K-002', stock: 120, min: 500, status: 'critical' },
  { id: 3, name: 'Microcontroller 328p', part: 'MC-328P-X', stock: 89, min: 100, status: 'warning' },
  // Add more mock data...
];

const StatusBadge = ({ status }) => {
  const styles = {
    good: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    warning: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    critical: 'bg-red-500/10 text-red-500 border-red-500/20 animate-pulse',
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-mono border ${styles[status]} flex items-center gap-2`}>
      {status === 'critical' && <AlertCircle size={12} />}
      {status === 'good' && <CheckCircle size={12} />}
      {status.toUpperCase()}
    </span>
  );
};

const Inventory = () => {
  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3.5 text-gray-500" size={20} />
          <input 
            type="text" 
            placeholder="Search component SKU or Name..." 
            className="w-full bg-cyber-gray/50 border border-white/10 rounded-xl py-3 pl-12 text-white focus:outline-none focus:border-cyber-neon focus:ring-1 focus:ring-cyber-neon transition-all"
          />
        </div>
        <button className="px-6 py-3 bg-cyber-slate border border-white/10 rounded-xl text-white hover:bg-white/5 flex items-center gap-2">
          <Filter size={18} /> Filter
        </button>
      </div>

      {/* List Header */}
      <div className="grid grid-cols-12 text-gray-500 font-mono text-xs uppercase tracking-wider px-6 pb-2">
        <div className="col-span-4">Component Name</div>
        <div className="col-span-3">Part Number</div>
        <div className="col-span-2">Stock Level</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-1">Action</div>
      </div>

      {/* Animated List */}
      <div className="space-y-3">
        {inventoryItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="grid grid-cols-12 items-center bg-cyber-gray/30 hover:bg-white/5 border border-white/5 hover:border-cyber-neon/30 p-4 rounded-xl transition-all cursor-pointer group"
          >
            <div className="col-span-4 font-medium text-white group-hover:text-cyber-neon transition-colors">
              {item.name}
            </div>
            <div className="col-span-3 font-mono text-gray-400 text-sm">
              {item.part}
            </div>
            <div className="col-span-2 font-mono text-white">
              {item.stock} <span className="text-gray-600 text-xs">/ {item.min}</span>
            </div>
            <div className="col-span-2">
              <StatusBadge status={item.status} />
            </div>
            <div className="col-span-1 text-right">
              <button className="text-gray-500 hover:text-white transition-colors">•••</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;