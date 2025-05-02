import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface OptimizationCardProps {
  title: string;
  description: string;
  savingsPercent: number;
  icon: React.ReactNode;
  action: string;
}

const OptimizationCard: React.FC<OptimizationCardProps> = ({
  title,
  description,
  savingsPercent,
  icon,
  action
}) => {
  const { darkMode } = useTheme();
  
  return (
    <div 
      className={`rounded-lg p-4 border-l-4 border-blue-500 ${
        darkMode ? 'bg-slate-800' : 'bg-white'
      } shadow-sm`}
    >
      <div className="flex items-center">
        <div className={`p-2 rounded-lg ${darkMode ? 'bg-blue-900 bg-opacity-50' : 'bg-blue-100'} text-blue-600`}>
          {icon}
        </div>
        <div className="ml-3">
          <h3 className="font-medium">{title}</h3>
          <div className="flex items-center">
            <div className="flex items-center">
              <span className="text-green-500 font-medium">{savingsPercent}%</span>
              <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">potential improvement</span>
            </div>
          </div>
        </div>
      </div>
      
      <p className={`mt-3 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {description}
      </p>
      
      <div className="mt-4">
        <button 
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          {action}
        </button>
      </div>
    </div>
  );
};

export default OptimizationCard;