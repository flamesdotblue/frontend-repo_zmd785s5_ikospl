import React from 'react';
import { motion } from 'framer-motion';

const PrimaryButton = ({ onPress, title, disabled = false, className = '' }) => {
  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      onClick={disabled ? undefined : onPress}
      disabled={disabled}
      className={`w-full rounded-xl py-3 px-4 text-sm font-semibold transition-colors ${
        disabled
          ? 'bg-[#2A2A2A] text-[#777] cursor-not-allowed'
          : 'bg-[#8338EC] hover:bg-[#6f2dd5] text-[#F5F5F5]'
      } ${className}`}
    >
      {title}
    </motion.button>
  );
};

export default PrimaryButton;
