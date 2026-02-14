import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react';
import { motion } from 'framer-motion';
import AuthLayout from '../components/AuthLayout';
import InputGroup from '../components/InputGroup';

const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    navigate('/dashboard');
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Enter your credentials to access the grid.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <InputGroup
          label="Email Address"
          name="email"
          type="email"
          icon={Mail}
          register={register}
          error={errors.email}
        />

        <InputGroup
          label="Password"
          name="password"
          type="password"
          icon={Lock}
          register={register}
          error={errors.password}
        />

        <div className="flex justify-between items-center text-xs font-mono text-gray-500 mb-6">
          <label className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
            <input type="checkbox" className="accent-cyber-primary bg-transparent rounded border-white/10" />
            REMEMBER ME
          </label>
          <Link to="/forgot-password" class="hover:text-cyber-primary transition-colors">
            FORGOT PASSWORD?
          </Link>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-cyber-primary text-cyber-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
          ) : (
            <>
              <span className="relative z-10 font-mono tracking-wider">INITIATE SESSION</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </>
          )}
        </motion.button>

        {/* Social Login */}
        <div className="mt-8">
          <div className="relative flex justify-center text-xs text-gray-500 font-mono mb-6">
            <span className="bg-cyber-gray/40 px-2 z-10">OR CONTINUE WITH</span>
            <div className="absolute inset-x-0 top-1/2 h-px bg-white/10 -z-0" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button type="button" className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all text-sm font-mono text-gray-300">
              <Github size={18} /> GITHUB
            </button>
            <button type="button" className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all text-sm font-mono text-gray-300">
              <Chrome size={18} /> GOOGLE
            </button>
          </div>
        </div>

        <div className="mt-8 text-center text-xs font-mono text-gray-500">
          NEW TO THE SYSTEM? {' '}
          <Link to="/signup" className="text-cyber-primary hover:underline underline-offset-4">
            CREATE ACCOUNT
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;