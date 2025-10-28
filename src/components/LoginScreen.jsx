import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PrimaryButton from './PrimaryButton';
import Spline from '@splinetool/react-spline';

const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-[#121212] text-[#F5F5F5] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="h-56 w-full overflow-hidden rounded-2xl bg-[#1E1E1E] mb-6">
          <Spline
            scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#1E1E1E] p-6 rounded-2xl shadow-xl border border-[#2A2A2A]"
        >
          <h1 className="text-3xl font-bold mb-2">DevConnect</h1>
          <p className="text-[#A0A0A0] mb-6">Your student hub for events, news, and volunteering.</p>
          <label className="block text-sm text-[#A0A0A0] mb-2">Email</label>
          <input
            type="email"
            className="w-full bg-[#121212] text-[#F5F5F5] placeholder-[#6B6B6B] rounded-xl px-4 py-3 mb-4 border border-transparent focus:outline-none focus:border-[#3A86FF]"
            placeholder="you@university.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="block text-sm text-[#A0A0A0] mb-2">Password</label>
          <input
            type="password"
            className="w-full bg-[#121212] text-[#F5F5F5] placeholder-[#6B6B6B] rounded-xl px-4 py-3 mb-6 border border-transparent focus:outline-none focus:border-[#3A86FF]"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PrimaryButton title="Login" onPress={() => onLogin({ email })} />
          <p className="mt-4 text-center text-sm text-[#A0A0A0]">
            Don't have an account? <span className="text-[#3A86FF]">Sign Up</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginScreen;
