import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Database, 
  FileSpreadsheet, 
  Terminal, 
  Save, 
  RefreshCw, 
  Download, 
  Upload,
  AlertOctagon
} from 'lucide-react';

const Settings = () => {
  const [threshold, setThreshold] = useState(20);
  const [isExporting, setIsExporting] = useState(false);
  const [logs, setLogs] = useState([
    "> SYSTEM_INIT_SEQUENCE_START...",
    "> CONNECTED_TO_DB: POSTGRES_MAIN_SHARD_01",
    "> AUTH_MODULE: LOADED (JWT_SECURE)",
    "> READY_FOR_INPUT..."
  ]);
  const logsEndRef = useRef(null);

  // Auto-scroll terminal
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const addLog = (msg) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    setLogs(prev => [...prev, `[${timestamp}] > ${msg}`]);
  };

  const handleExport = () => {
    setIsExporting(true);
    addLog("INITIATING_DATA_DUMP...");
    setTimeout(() => {
      addLog("GENERATING_EXCEL_BLOB...");
    }, 800);
    setTimeout(() => {
      setIsExporting(false);
      addLog("EXPORT_SUCCESS: INVENTORY_V4.XLSX");
    }, 2000);
  };

  const handleSave = () => {
    addLog(`UPDATING_GLOBAL_CONFIG: THRESHOLD_SET_TO_${threshold}%`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
      
      {/* COLUMN 1: SYSTEM CONFIG */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* Section: Global Thresholds */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-cyber-gray/30 border border-white/5 rounded-2xl p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Shield size={100} />
          </div>
          <h2 className="text-xl font-bold text-white mb-6 font-mono flex items-center gap-2">
            <AlertOctagon className="text-cyber-primary" /> SAFETY PROTOCOLS
          </h2>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2 font-mono text-sm">
                <span className="text-gray-400">LOW STOCK TRIGGER THRESHOLD</span>
                <span className="text-cyber-primary font-bold">{threshold}% OF MONTHLY AVG</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="50" 
                value={threshold} 
                onChange={(e) => setThreshold(e.target.value)}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyber-primary"
              />
              <p className="text-xs text-gray-500 mt-2 font-mono">
                *Components falling below this percentage will auto-trigger procurement requests.
              </p>
            </div>
            
            <button 
              onClick={handleSave}
              className="px-6 py-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyber-primary text-white font-mono text-sm rounded transition-all flex items-center gap-2"
            >
              <Save size={16} /> SAVE CONFIGURATION
            </button>
          </div>
        </motion.div>

        {/* Section: Data Uplink (Excel) */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Export Card */}
          <div className="bg-black/40 border border-white/10 rounded-2xl p-6 group hover:border-cyber-neon/50 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-cyber-neon/10 rounded-lg text-cyber-neon">
                <Database size={24} />
              </div>
              <div className="text-xs font-mono text-gray-500">DB_DUMP</div>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Export Database</h3>
            <p className="text-sm text-gray-400 mb-6">Download full inventory snapshot as .XLSX</p>
            <button 
              onClick={handleExport}
              disabled={isExporting}
              className="w-full py-3 border border-cyber-neon/30 text-cyber-neon hover:bg-cyber-neon/10 font-mono text-sm rounded flex justify-center items-center gap-2 transition-all"
            >
              {isExporting ? <RefreshCw className="animate-spin" size={16}/> : <Download size={16} />}
              {isExporting ? 'PROCESSING...' : 'INITIATE DOWNLOAD'}
            </button>
          </div>

          {/* Import Card */}
          <div className="bg-black/40 border border-white/10 rounded-2xl p-6 group hover:border-cyber-primary/50 transition-colors relative border-dashed">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-cyber-primary/10 rounded-lg text-cyber-primary">
                <FileSpreadsheet size={24} />
              </div>
              <div className="text-xs font-mono text-gray-500">DATA_INGEST</div>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Bulk Import</h3>
            <p className="text-sm text-gray-400 mb-6">Upload .XLSX to update stock levels.</p>
            
            <label className="w-full py-3 bg-cyber-primary/10 hover:bg-cyber-primary/20 text-cyber-primary font-mono text-sm rounded flex justify-center items-center gap-2 cursor-pointer transition-all">
              <Upload size={16} /> UPLOAD FILE
              <input type="file" className="hidden" onChange={() => addLog("FILE_SELECTED: PENDING_VALIDATION...")} />
            </label>
          </div>
        </motion.div>
      </div>

      {/* COLUMN 2: LIVE TERMINAL */}
      <div className="lg:col-span-1 h-full min-h-[400px]">
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="h-full bg-black border border-white/10 rounded-2xl p-4 font-mono text-xs flex flex-col"
        >
          <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
            <Terminal size={14} className="text-green-500" />
            <span className="text-gray-400">SYSTEM_LOGS.LOG</span>
            <div className="ml-auto w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-2 text-green-500/80 custom-scrollbar pr-2">
            {logs.map((log, i) => (
              <div key={i} className="break-words">{log}</div>
            ))}
            <div ref={logsEndRef} />
          </div>

          <div className="mt-4 pt-2 border-t border-white/10 flex gap-2">
            <span className="text-green-500 animate-pulse">{'>'}</span>
            <input 
              type="text" 
              placeholder="Enter command..."
              className="bg-transparent border-none focus:outline-none text-white w-full"
              onKeyDown={(e) => {
                if(e.key === 'Enter') {
                  addLog(`CMD_EXEC: ${e.target.value}`);
                  addLog("ERROR: PERMISSION_DENIED (ADMIN_ONLY)");
                  e.target.value = '';
                }
              }}
            />
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default Settings;