import React from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const AnomalyList: React.FC = () => {
  const { darkMode } = useTheme();
  
  const anomalies = [
    {
      id: 1,
      title: 'High CPU Usage',
      device: 'Core Router 02',
      time: '10 min ago',
      severity: 'high'
    },
    {
      id: 2,
      title: 'Unusual Traffic Pattern',
      device: 'Edge Switch 08',
      time: '45 min ago',
      severity: 'medium'
    },
    {
      id: 3,
      title: 'Multiple Auth Failures',
      device: 'Auth Server',
      time: '2 hours ago',
      severity: 'high'
    }
  ];
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-500 bg-red-100 dark:bg-red-900 dark:bg-opacity-20';
      case 'medium':
        return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900 dark:bg-opacity-20';
      default:
        return 'text-blue-500 bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20';
    }
  };
  
  return (
    <div className="space-y-4">
      {anomalies.map((anomaly) => (
        <div 
          key={anomaly.id}
          className={`p-3 rounded-lg border ${
            darkMode ? 'border-slate-700 hover:bg-slate-700' : 'border-gray-200 hover:bg-gray-50'
          } transition-colors cursor-pointer`}
        >
          <div className="flex items-start">
            <div className={`p-2 rounded-full ${getSeverityColor(anomaly.severity)}`}>
              <AlertTriangle size={16} />
            </div>
            <div className="ml-3 flex-1">
              <h4 className="font-medium text-sm">{anomaly.title}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">{anomaly.device}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">{anomaly.time}</span>
                <span 
                  className={`px-2 py-0.5 text-xs rounded-full ${getSeverityColor(anomaly.severity)}`}
                >
                  {anomaly.severity}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <button 
        className={`w-full mt-3 p-2 rounded-lg border ${
          darkMode 
            ? 'border-slate-700 hover:bg-slate-700' 
            : 'border-gray-200 hover:bg-gray-50'
        } flex items-center justify-center text-sm`}
      >
        <span>View All Anomalies</span>
        <ArrowRight size={14} className="ml-1" />
      </button>
    </div>
  );
};

export default AnomalyList;