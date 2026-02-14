import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, Zap, AlertTriangle, CheckCircle, Package, ArrowRight } from 'lucide-react';

// Mock Data (Replace with API call later)
const pcbOptions = [
  { id: 1, name: 'Mainboard Alpha v2', sku: 'MB-ALP-02', components: 12 },
  { id: 2, name: 'Power Unit Delta', sku: 'PSU-DEL-01', components: 8 },
  { id: 3, name: 'Sensor Array X', sku: 'SEN-ARR-X', components: 25 },
  { id: 4, name: 'Comms Module Z', sku: 'COM-MOD-Z', components: 15 },
  { id: 5, name: 'Battery Management', sku: 'BMS-LION-4S', components: 30 },
];

const Production = () => {
  const [selectedPcb, setSelectedPcb] = useState(null);
  const [quantity, setQuantity] = useState(100);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState(null);

  // The "Pre-Flight" Check Logic
  useEffect(() => {
    if (!selectedPcb) return;
    
    setIsSimulating(true);
    // Fake a calculation delay for "System Realism"
    const timer = setTimeout(() => {
      // Mock result: Randomly generate a shortage for drama
      const hasShortage = quantity > 150; 
      setSimulationResult({
        status: hasShortage ? 'critical' : 'optimal',
        requiredComponents: selectedPcb.components * quantity,
        projectedWaste: Math.floor(quantity * 0.02), // 2% scrap rate
        shortages: hasShortage ? ['Capacitor 10uF', 'Resistor 10k'] : []
      });
      setIsSimulating(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [selectedPcb, quantity]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-8rem)]">
      
      {/* LEFT PANEL: COMMAND DECK */}
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        // 👇 FIX APPLIED HERE: Changed 'overflow-hidden' to 'overflow-y-auto'
        className="bg-cyber-gray/30 border border-white/5 rounded-2xl p-8 flex flex-col justify-between relative overflow-y-auto"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-primary to-transparent opacity-20" />
        
        <div>
          <h2 className="text-2xl font-bold text-white mb-6 font-mono flex items-center gap-2">
            <Settings className="text-cyber-primary" /> PRODUCTION LINE A
          </h2>

          {/* PCB Selection */}
          <div className="space-y-4 mb-8">
            <label className="text-gray-400 text-xs font-mono uppercase tracking-widest">Select Blueprint</label>
            <div className="grid gap-3">
              {pcbOptions.map((pcb) => (
                <div 
                  key={pcb.id}
                  onClick={() => setSelectedPcb(pcb)}
                  className={`p-4 border rounded-xl cursor-pointer transition-all flex justify-between items-center group
                    ${selectedPcb?.id === pcb.id 
                      ? 'bg-cyber-primary/10 border-cyber-primary text-white' 
                      : 'bg-black/20 border-white/5 text-gray-400 hover:border-white/20 hover:bg-white/5'
                    }`}
                >
                  <div>
                    <div className="font-bold">{pcb.name}</div>
                    <div className="text-xs font-mono opacity-60">{pcb.sku}</div>
                  </div>
                  {selectedPcb?.id === pcb.id && <Zap size={16} className="text-cyber-primary animate-pulse" />}
                </div>
              ))}
            </div>
          </div>

          {/* Quantity Slider */}
          <div className="space-y-4 mb-8">
             <label className="text-gray-400 text-xs font-mono uppercase tracking-widest flex justify-between">
                <span>Batch Quantity</span>
                <span className="text-cyber-neon font-bold">{quantity} UNITS</span>
             </label>
             <input 
               type="range" 
               min="10" 
               max="500" 
               value={quantity} 
               onChange={(e) => setQuantity(Number(e.target.value))}
               className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyber-primary hover:accent-yellow-300"
             />
             <div className="flex justify-between text-xs font-mono text-gray-500">
               <span>10</span>
               <span>250</span>
               <span>500</span>
             </div>
          </div>
        </div>

        {/* The Big Button */}
        <button 
          disabled={!selectedPcb || simulationResult?.status === 'critical'}
          className={`w-full py-4 rounded-xl font-bold font-mono tracking-widest transition-all relative overflow-hidden group flex-shrink-0
            ${!selectedPcb 
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
              : simulationResult?.status === 'critical'
                ? 'bg-red-500/10 text-red-500 border border-red-500/50 cursor-not-allowed'
                : 'bg-cyber-primary text-cyber-black hover:shadow-[0_0_30px_rgba(250,204,21,0.4)]'
            }`}
        >
          {simulationResult?.status === 'critical' ? 'RESOURCE LOCK' : 'INITIATE SEQUENCE'}
        </button>
      </motion.div>

      {/* RIGHT PANEL: SIMULATION ENGINE */}
      <motion.div 
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-black/40 border border-white/10 rounded-2xl p-8 relative overflow-y-auto"
      >
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

        <h3 className="text-lg font-mono text-gray-400 mb-6 flex items-center gap-2">
          <Package size={18} /> RESOURCE SIMULATION
        </h3>

        {!selectedPcb ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-600 font-mono text-sm opacity-50">
            <div className="w-16 h-16 border-2 border-dashed border-gray-700 rounded-full animate-spin-slow mb-4" />
            WAITING FOR INPUT...
          </div>
        ) : (
          <div className="space-y-6">
            {/* Status Indicator */}
            <div className={`p-4 rounded-lg border ${
              isSimulating ? 'border-cyber-neon/30 bg-cyber-neon/5 text-cyber-neon' :
              simulationResult?.status === 'optimal' ? 'border-green-500/30 bg-green-500/5 text-green-400' :
              'border-red-500/30 bg-red-500/5 text-red-400'
            }`}>
              <div className="flex items-center gap-3 font-mono font-bold">
                {isSimulating ? (
                  <> <div className="w-2 h-2 bg-cyber-neon rounded-full animate-ping" /> CALCULATING... </>
                ) : simulationResult?.status === 'optimal' ? (
                  <> <CheckCircle size={18} /> RESOURCES ADEQUATE </>
                ) : (
                  <> <AlertTriangle size={18} /> INSUFFICIENT STOCK </>
                )}
              </div>
            </div>

            {/* Metrics */}
            {!isSimulating && simulationResult && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-lg">
                    <div className="text-gray-500 text-xs font-mono mb-1">COMPONENTS REQ.</div>
                    <div className="text-2xl font-bold text-white">{simulationResult.requiredComponents}</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg">
                    <div className="text-gray-500 text-xs font-mono mb-1">PROJECTED SCRAP</div>
                    <div className="text-2xl font-bold text-cyber-primary">{simulationResult.projectedWaste}</div>
                  </div>
                </div>

                {/* Shortage List */}
                {simulationResult.shortages.length > 0 && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <div className="text-red-400 text-xs font-mono mb-3 uppercase">Missing Components</div>
                    {simulationResult.shortages.map((item, i) => (
                      <div key={i} className="flex justify-between items-center text-sm text-white py-1 border-b border-red-500/20 last:border-0">
                        <span>{item}</span>
                        <span className="font-mono text-red-400">-400 units</span>
                      </div>
                    ))}
                    <button className="w-full mt-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-mono py-2 rounded transition-colors flex items-center justify-center gap-2">
                      GENERATE PROCUREMENT ORDER <ArrowRight size={12} />
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Production;