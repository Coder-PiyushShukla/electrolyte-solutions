import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import AuthLayout from '../components/AuthLayout';
import InputGroup from '../components/InputGroup';

const Signup = () => {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();
  const password = watch("password", "");

  // Calculate Password Strength
  const strength = Math.min(
    (password.length > 6 ? 1 : 0) +
    (/[A-Z]/.test(password) ? 1 : 0) +
    (/[0-9]/.test(password) ? 1 : 0) +
    (/[^A-Za-z0-9]/.test(password) ? 1 : 0),
    4
  );

  const onSubmit = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    navigate('/dashboard');
  };

  return (
    <AuthLayout title="Join the Network" subtitle="Create your identity to access secured protocols.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <InputGroup
          label="Full Name"
          name="name"
          type="text"
          icon={User}
          register={register}
        />

        <InputGroup
          label="Email Address"
          name="email"
          type="email"
          icon={Mail}
          register={register}
        />

        <InputGroup
          label="Password"
          name="password"
          type="password"
          icon={Lock}
          register={register}
        />

        {/* Password Strength Meter */}
        <div className="flex gap-2 mb-6 h-1">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ backgroundColor: "#1f2937" }}
              animate={{
                backgroundColor: i < strength
                  ? (strength < 2 ? "#ff003c" : strength < 3 ? "#facc15" : "#00f0ff")
                  : "#1f2937"
              }}
              className="h-full flex-1 rounded-full transition-colors duration-300"
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-cyber-primary text-cyber-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] transition-all relative overflow-hidden group"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
          ) : (
            <>
              <span className="font-mono tracking-wider z-10">REGISTER ID</span>
              <ShieldCheck size={18} className="z-10" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </>
          )}
        </motion.button>

        <div className="mt-8 text-center text-xs font-mono text-gray-500">
          ALREADY AUTHENTICATED? {' '}
          <Link to="/sign-in" className="text-cyber-primary hover:underline underline-offset-4">
            ACCESS TERMINAL
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Signup;