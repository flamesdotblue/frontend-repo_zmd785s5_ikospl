import React from 'react';

const tabs = [
  { key: 'Home', label: 'Events', icon: 'E' },
  { key: 'News', label: 'News', icon: 'N' },
  { key: 'Volunteer', label: 'Volunteer', icon: 'V' },
  { key: 'Profile', label: 'Profile', icon: 'P' },
];

const BottomTabBar = ({ active, onChange }) => {
  return (
    <div className="fixed bottom-0 inset-x-0 bg-[#1E1E1E] border-t border-[#2A2A2A] px-3 py-2">
      <div className="max-w-md mx-auto grid grid-cols-4 gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={`flex flex-col items-center justify-center py-2 rounded-lg text-xs select-none transition-colors ${
              active === t.key ? 'text-[#8338EC]' : 'text-[#A0A0A0] hover:text-[#F5F5F5]'
            }`}
          >
            <span className="text-base mb-0.5">[{t.icon}]</span>
            <span className="font-medium">{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomTabBar;
