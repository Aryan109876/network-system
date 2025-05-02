import React, { useState } from 'react';
import { Calendar, Download, BarChart2, PieChart, LineChart, TrendingUp, Clock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Analytics: React.FC = () => {
  const { darkMode } = useTheme();
  const [timeframe, setTimeframe] = useState('7d');
  
  const timeframes = [
    { id: '24h', label: 'Last 24 Hours' },
    { id: '7d', label: 'Last 7 Days' },
    { id: '30d', label: 'Last 30 Days' },
    { id: '90d', label: 'Last 90 Days' },
  ];
  
  const metricsCards = [
    { 
      title: 'Average Bandwidth', 
      value: '3.8 Gbps', 
      change: '+12%', 
      isPositive: true,
      icon: <TrendingUp size={20} /> 
    },
    { 
      title: 'Peak Latency', 
      value: '38 ms', 
      change: '-5ms', 
      isPositive: true,
      icon: <Clock size={20} /> 
    },
    { 
      title: 'Total Throughput', 
      value: '24.6 TB', 
      change: '+18%', 
      isPositive: true,
      icon: <BarChart2 size={20} /> 
    },
    { 
      title: 'Packet Loss Rate', 
      value: '0.02%', 
      change: '-0.01%', 
      isPositive: true,
      icon: <LineChart size={20} /> 
    },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Network Analytics</h1>
        
        <div className="flex items-center gap-2">
          <div className={`flex items-center rounded-lg overflow-hidden ${darkMode ? 'bg-slate-800' : 'bg-white'} border ${darkMode ? 'border-slate-700' : 'border-gray-300'}`}>
            {timeframes.map((frame) => (
              <button
                key={frame.id}
                onClick={() => setTimeframe(frame.id)}
                className={`px-3 py-1.5 text-sm ${
                  timeframe === frame.id 
                    ? 'bg-blue-600 text-white' 
                    : `${darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`
                }`}
              >
                {frame.label}
              </button>
            ))}
          </div>
          
          <button
            className={`p-2 rounded-lg border ${
              darkMode ? 'border-slate-700 hover:bg-slate-700' : 'border-gray-300 hover:bg-gray-100'
            } flex items-center gap-2`}
          >
            <Calendar size={16} />
            <span className="hidden md:inline">Custom Range</span>
          </button>
          
          <button
            className={`p-2 rounded-lg border ${
              darkMode ? 'border-slate-700 hover:bg-slate-700' : 'border-gray-300 hover:bg-gray-100'
            }`}
          >
            <Download size={16} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricsCards.map((card, index) => (
          <div 
            key={index}
            className={`rounded-lg p-4 ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-sm`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{card.title}</p>
                <p className="text-2xl font-bold mt-1">{card.value}</p>
              </div>
              <div className={`p-2 rounded-full ${darkMode ? 'bg-blue-900 bg-opacity-50' : 'bg-blue-100'} text-blue-600`}>
                {card.icon}
              </div>
            </div>
            <div className="mt-2">
              <span className={`text-sm ${card.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {card.change}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">vs previous period</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`rounded-lg p-4 ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-sm`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">Bandwidth Usage Over Time</h2>
            <div className="flex space-x-2">
              {['Hour', 'Day', 'Week'].map((unit) => (
                <button 
                  key={unit}
                  className={`px-3 py-1 text-xs rounded-lg ${
                    unit === 'Day'
                      ? 'bg-blue-600 text-white'
                      : `${darkMode ? 'bg-slate-700' : 'bg-gray-100'}`
                  }`}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-64 flex items-end">
            {/* Simulated chart bars */}
            {Array.from({ length: 12 }).map((_, index) => {
              const height = 30 + Math.random() * 70;
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className={`w-full max-w-[20px] bg-blue-500 rounded-t-sm ${index % 3 === 0 ? 'bg-opacity-90' : 'bg-opacity-60'}`}
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {index + 1}
                  </span>
                </div>
              );
            })}
          </div>
          
          <div className="flex justify-between mt-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span className="inline-block w-3 h-3 bg-blue-500 mr-1 rounded-sm"></span>
              Bandwidth (Gbps)
            </div>
            <button className="text-sm text-blue-600">View Details</button>
          </div>
        </div>
        
        <div className={`rounded-lg p-4 ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-sm`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">Traffic Distribution</h2>
            <select 
              className={`rounded border ${darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300'} px-2 py-1 text-sm`}
            >
              <option>By Protocol</option>
              <option>By Application</option>
              <option>By Subnet</option>
            </select>
          </div>
          
          <div className="flex items-center justify-center h-64 relative">
            {/* Simulated pie chart */}
            <div className="w-40 h-40 rounded-full border-8 border-blue-500 relative">
              <div className="absolute inset-0 border-t-8 border-r-8 border-green-500 rounded-full rotate-45"></div>
              <div className="absolute inset-0 border-t-8 border-purple-500 rounded-full rotate-[210deg]"></div>
              <div className="absolute inset-0 border-l-8 border-yellow-500 rounded-full rotate-[260deg]"></div>
            </div>
            
            <div className="absolute top-0 right-0 bottom-0 w-40 flex flex-col justify-center space-y-3">
              {[
                { color: 'bg-blue-500', label: 'HTTP/HTTPS', value: '42%' },
                { color: 'bg-green-500', label: 'Video Streaming', value: '28%' },
                { color: 'bg-purple-500', label: 'File Transfer', value: '18%' },
                { color: 'bg-yellow-500', label: 'Other', value: '12%' },
              ].map((item, index) => (
                <div key={index} className="flex items-center text-sm">
                  <div className={`w-3 h-3 ${item.color} rounded-sm mr-2`}></div>
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {item.label}
                  </span>
                  <span className="ml-auto font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between mt-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Based on total traffic volume
            </div>
            <button className="text-sm text-blue-600">View Details</button>
          </div>
        </div>
      </div>
      
      <div className={`rounded-lg p-4 ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-sm`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">Top Applications by Bandwidth</h2>
          <select 
            className={`rounded border ${darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300'} px-2 py-1 text-sm`}
          >
            <option>Top 10</option>
            <option>Top 25</option>
            <option>All</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`text-left ${darkMode ? 'bg-slate-700' : 'bg-gray-50'}`}>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Application</th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Total Usage</th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Peak Rate</th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Usage Trend</th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">% of Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {[
                { name: 'Video Streaming', usage: '8.2 TB', peak: '1.2 Gbps', trend: '+18%', percent: 32 },
                { name: 'Web Browsing', usage: '5.4 TB', peak: '850 Mbps', trend: '+5%', percent: 21 },
                { name: 'File Sharing', usage: '3.8 TB', peak: '620 Mbps', trend: '-3%', percent: 15 },
                { name: 'Software Updates', usage: '2.1 TB', peak: '480 Mbps', trend: '+42%', percent: 8 },
                { name: 'Database Traffic', usage: '1.8 TB', peak: '320 Mbps', trend: '+10%', percent: 7 },
              ].map((app, index) => (
                <tr 
                  key={index}
                  className={darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-50'}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{app.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {app.usage}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {app.peak}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={app.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                      {app.trend}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-2.5 mr-2 max-w-24">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${app.percent}%` }}
                        ></div>
                      </div>
                      <span>{app.percent}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;