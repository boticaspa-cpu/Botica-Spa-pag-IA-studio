import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, sub, trend, icon }) => (
  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
    <div className="flex items-start justify-between mb-3">
      <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">{label}</span>
      {icon && <span className="text-[#5A5A40]">{icon}</span>}
    </div>
    <div className="text-3xl font-serif text-[#1A1A1A] mb-1">{value}</div>
    {sub && (
      <div className={`text-xs font-medium ${trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-400' : 'text-gray-400'}`}>
        {sub}
      </div>
    )}
  </div>
);
