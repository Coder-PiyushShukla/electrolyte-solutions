import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

const InputGroup = ({ label, type = "text", icon: Icon, register, name, error, placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="mb-5 relative">
      <div 
        className={`relative flex items-center bg-black/30 border rounded-xl transition-all duration-300 group
          ${error ? 'border-cyber-danger/50' : isFocused ? 'border-cyber-primary shadow-[0_0_15px_rgba(250,204,21,0.1)]' : 'border-white/10 hover:border-white/20'}
        `}
      >
        <div className="pl-4 text-gray-500 group-hover:text-gray-300 transition-colors">
          <Icon size={20} />
        </div>
        
        <div className="relative flex-1">
          <motion.label
            initial={false}
            animate={{
              y: isFocused || hasValue ? -8 : 12,
              scale: isFocused || hasValue ? 0.75 : 1,
              opacity: isFocused || hasValue ? 0.7 : 0.5
            }}
            className="absolute left-3 top-0 text-gray-400 pointer-events-none font-mono tracking-wide"
          >
            {label}
          </motion.label>
          <input
            {...register(name, { 
              onChange: (e) => setHasValue(e.target.value.length > 0)
            })}
            type={inputType}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full bg-transparent text-white px-3 pt-6 pb-2 focus:outline-none font-sans"
          />
        </div>

        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="pr-4 text-gray-500 hover:text-white transition-colors focus:outline-none"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      
      {/* Error Message Animation */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: error ? 'auto' : 0, opacity: error ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="text-cyber-danger text-xs font-mono mt-1 flex items-center gap-1">
          <span className="inline-block w-1 h-1 bg-cyber-danger rounded-full" />
          {error?.message}
        </p>
      </motion.div>
    </div>
  );
};

export default InputGroup;