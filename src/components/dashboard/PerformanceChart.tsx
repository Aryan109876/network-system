import React, { useState, useEffect } from 'react';
import { Link as Line } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface PerformanceChartProps {
  timeRange: string;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ timeRange }) => {
  const { darkMode } = useTheme();
  const [chartData, setChartData] = useState<number[]>([]);
  
  useEffect(() => {
    // Simulate different data patterns based on time range
    const generateData = () => {
      const dataPoints = timeRange === '1h' ? 60 : 
                         timeRange === '24h' ? 24 : 
                         timeRange === '7d' ? 7 : 30;
                         
      const mockData = Array.from({ length: dataPoints }, () => 
        Math.floor(Math.random() * 50) + 30
      );
      
      setChartData(mockData);
    };
    
    generateData();
  }, [timeRange]);
  
  // Simple chart visualization
  const chartHeight = 200;
  const maxValue = Math.max(...chartData);
  
  return (
    <div className="h-64 w-full">
      <div className="h-full flex items-end">
        {chartData.map((value, index) => {
          const height = (value / maxValue) * chartHeight;
          
          return (
            <div 
              key={index} 
              className="flex-1 flex flex-col items-center justify-end h-full"
            >
              <div 
                className={`w-full md:w-4/5 bg-blue-500 rounded-t-sm transition-all duration-500 ease-in-out ${
                  index % 2 === 0 ? 'bg-opacity-90' : 'bg-opacity-70'
                }`}
                style={{ height: `${height}px` }}
              ></div>
              {chartData.length <= 24 && (
                <span className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {timeRange === '1h' ? `${index}m` : `${index}${timeRange === '24h' ? 'h' : 'd'}`}
                </span>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-between mt-4 items-center">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
          <span className="text-sm text-gray-500">Bandwidth Usage</span>
        </div>
        <div>
          <select 
            className={`text-sm rounded border ${
              darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300'
            } px-2 py-1`}
          >
            <option>Auto Refresh</option>
            <option>15s</option>
            <option>30s</option>
            <option>60s</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;