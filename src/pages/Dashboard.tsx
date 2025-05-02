import React, { useState, useEffect } from 'react';
import { Cpu, AlertTriangle, BarChart, Clock, Activity, Wifi, Zap, Server } from 'lucide-react';
import NetworkStatusCard from '../components/dashboard/NetworkStatusCard';
import PerformanceChart from '../components/dashboard/PerformanceChart';
import AnomalyList from '../components/dashboard/AnomalyList';
import OptimizationCard from '../components/dashboard/OptimizationCard';
import { useNetworkData } from '../context/NetworkDataContext';
import { useTheme } from '../context/ThemeContext';

const Dashboard: React.FC = () => {
  const { darkMode } = useTheme();
  const { networkStatus, loadNetworkData } = useNetworkData();
  const [timeRange, setTimeRange] = useState('24h');
  
  useEffect(() => {
    loadNetworkData();
    // Set up polling interval for real-time updates
    const interval = setInterval(() => {
      loadNetworkData();
    }, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, [loadNetworkData]);
  
  const statusCards = [
    { 
      title: 'Network Health', 
      value: networkStatus?.health || '85%', 
      trend: '+2.5%', 
      icon: <Activity size={24} className="text-green-500" />,
      color: 'green'
    },
    { 
      title: 'Bandwidth Usage', 
      value: networkStatus?.bandwidth || '4.2 Gbps', 
      trend: '-0.8%', 
      icon: <Wifi size={24} className="text-blue-500" />,
      color: 'blue'
    },
    { 
      title: 'Latency', 
      value: networkStatus?.latency || '24ms', 
      trend: '-3ms', 
      icon: <Clock size={24} className="text-yellow-500" />,
      color: 'yellow'
    },
    { 
      title: 'Active Alerts', 
      value: networkStatus?.alerts || '3', 
      trend: '+1', 
      icon: <AlertTriangle size={24} className="text-red-500" />,
      color: 'red'
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Network Dashboard</h1>
        <div className={`flex items-center space-x-2 rounded-lg overflow-hidden border ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
          {['1h', '24h', '7d', '30d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-sm ${
                timeRange === range 
                  ? 'bg-blue-600 text-white' 
                  : `${darkMode ? 'bg-slate-800 text-gray-300 hover:bg-slate-700' : 'bg-white text-gray-700 hover:bg-gray-100'}`
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statusCards.map((card, index) => (
          <NetworkStatusCard 
            key={index}
            title={card.title}
            value={card.value}
            trend={card.trend}
            icon={card.icon}
            color={card.color}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className={`h-full rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-sm p-4`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Network Performance</h2>
              <select 
                className={`rounded border ${darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300'} px-2 py-1`}
              >
                <option>Bandwidth</option>
                <option>Latency</option>
                <option>Packet Loss</option>
              </select>
            </div>
            <PerformanceChart timeRange={timeRange} />
          </div>
        </div>
        
        <div>
          <div className={`h-full rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-sm p-4`}>
            <h2 className="text-xl font-semibold mb-4">Detected Anomalies</h2>
            <AnomalyList />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <OptimizationCard 
          title="Bandwidth Optimization"
          description="AI analysis detected potential bandwidth savings by optimizing video streaming traffic patterns."
          savingsPercent={18}
          icon={<Zap size={24} />}
          action="Optimize Now"
        />
        
        <OptimizationCard 
          title="Server Load Balancing"
          description="Recommend redistribution of network loads across servers to improve response times."
          savingsPercent={23}
          icon={<Server size={24} />}
          action="View Details"
        />
      </div>
      
      <div className={`rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-sm p-4`}>
        <h2 className="text-xl font-semibold mb-4">Resource Utilization</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {['CPU', 'Memory', 'Storage', 'Network I/O'].map((resource, index) => (
            <div key={index} className={`p-4 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-gray-50'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{resource}</span>
                <Cpu size={18} />
              </div>
              <div className="flex items-end">
                <span className="text-2xl font-bold">{Math.floor(Math.random() * 40) + 40}%</span>
                <span className="ml-2 text-xs text-green-500">Normal</span>
              </div>
              <div className="mt-2 w-full bg-gray-300 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${Math.floor(Math.random() * 40) + 40}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;