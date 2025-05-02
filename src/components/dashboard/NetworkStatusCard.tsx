import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface NetworkStatusCardProps {
  title: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
  color: string;
}

const NetworkStatusCard: React.FC<NetworkStatusCardProps> = ({
  title,
  value,
  trend,
  icon,
  color
}) => {
  const { darkMode } = useTheme();
  
  const isTrendPositive = trend.startsWith('+');
  const trendColor = color === 'red' 
    ? (isTrendPositive ? 'text-red-500' : 'text-green-500')
    : (isTrendPositive ? 'text-green-500' : 'text-red-500');
  
  return (
    <div 
      className={`p-4 rounded-lg shadow-sm transition-all duration-300 ${
        darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:shadow-md'
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div>
          {icon}
        </div>
      </div>
      <div className="mt-2">
        <span className={`text-sm ${trendColor} font-medium`}>
          {trend} 
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">from last period</span>
      </div>
    </div>
  );
};

export default NetworkStatusCard;