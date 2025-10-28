import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-2xl p-4 animate-pulse">
      <div className="h-4 w-2/3 bg-[#2A2A2A] rounded mb-3" />
      <div className="h-3 w-1/3 bg-[#2A2A2A] rounded mb-2" />
      <div className="h-3 w-24 bg-[#2A2A2A] rounded mb-4" />
      <div className="h-20 w-full bg-[#2A2A2A] rounded mb-4" />
      <div className="h-9 w-28 bg-[#2A2A2A] rounded-xl" />
    </div>
  );
};

export default SkeletonCard;
