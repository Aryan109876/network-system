import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Server, Laptop, Smartphone, Activity } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface Device {
  id: number;
  name: string;
  type: string;
  ip: string;
  status: string;
  lastSeen: string;
  load: number;
}

const DeviceManager: React.FC = () => {
  const { darkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  
  const devices: Device[] = [
    { id: 1, name: 'Core Router', type: 'network', ip: '192.168.1.1', status: 'online', lastSeen: 'Now', load: 42 },
    { id: 2, name: 'Main Firewall', type: 'security', ip: '192.168.1.2', status: 'online', lastSeen: 'Now', load: 36 },
    { id: 3, name: 'App Server 01', type: 'server', ip: '192.168.1.10', status: 'online', lastSeen: 'Now', load: 78 },
    { id: 4, name: 'App Server 02', type: 'server', ip: '192.168.1.11', status: 'online', lastSeen: 'Now', load: 65 },
    { id: 5, name: 'Database Server', type: 'server', ip: '192.168.1.12', status: 'warning', lastSeen: 'Now', load: 89 },
    { id: 6, name: 'Backup Server', type: 'server', ip: '192.168.1.13', status: 'online', lastSeen: 'Now', load: 23 },
    { id: 7, name: 'Edge Switch 01', type: 'network', ip: '192.168.1.20', status: 'online', lastSeen: 'Now', load: 45 },
    { id: 8, name: 'Edge Switch 02', type: 'network', ip: '192.168.1.21', status: 'offline', lastSeen: '2 hours ago', load: 0 },
    { id: 9, name: 'Dev Workstation', type: 'endpoint', ip: '192.168.1.100', status: 'online', lastSeen: 'Now', load: 32 },
    { id: 10, name: 'Admin Laptop', type: 'endpoint', ip: '192.168.1.101', status: 'online', lastSeen: '10 min ago', load: 15 },
  ];
  
  const deviceTypes = [
    { id: 'all', label: 'All Devices' },
    { id: 'server', label: 'Servers' },
    { id: 'network', label: 'Network' },
    { id: 'security', label: 'Security' },
    { id: 'endpoint', label: 'Endpoints' },
  ];
  
  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          device.ip.includes(searchQuery);
    const matchesType = selectedType === 'all' || device.type === selectedType;
    
    return matchesSearch && matchesType;
  });
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'server':
        return <Server size={16} />;
      case 'network':
        return <Activity size={16} />;
      case 'endpoint':
        return <Laptop size={16} />;
      case 'security':
        return <Smartphone size={16} />;
      default:
        return <Server size={16} />;
    }
  };
  
  const getLoadColor = (load: number) => {
    if (load >= 80) return 'text-red-500';
    if (load >= 60) return 'text-yellow-500';
    return 'text-green-500';
  };
  
  return (
    <div className="h-full">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Device Manager</h1>
        
        <div className="flex items-center gap-2">
          <div className={`flex items-center rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-white'} border ${darkMode ? 'border-slate-700' : 'border-gray-300'} px-3 py-1.5`}>
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search devices..."
              className={`ml-2 outline-none border-none ${darkMode ? 'bg-slate-800' : 'bg-white'} w-full`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <button
            className={`p-2 rounded-lg border ${
              darkMode ? 'border-slate-700 hover:bg-slate-700' : 'border-gray-300 hover:bg-gray-100'
            } flex items-center gap-2`}
          >
            <Filter size={16} />
            <span className="hidden md:inline">Filter</span>
          </button>
          
          <button
            className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <Plus size={16} />
            <span className="hidden md:inline">Add Device</span>
          </button>
        </div>
      </div>
      
      <div className="mb-4 flex overflow-x-auto">
        {deviceTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={`px-4 py-2 rounded-lg mr-2 transition-colors ${
              selectedType === type.id 
                ? 'bg-blue-600 text-white' 
                : `${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-gray-100'}`
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>
      
      <div className={`rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-sm overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`text-left ${darkMode ? 'bg-slate-700' : 'bg-gray-50'}`}>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">IP Address</th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Last Seen</th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Load</th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {filteredDevices.map((device) => (
                <tr 
                  key={device.id}
                  className={`
                    ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-50'} 
                    ${device.status === 'offline' ? 'opacity-60' : ''}
                  `}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{device.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {getTypeIcon(device.type)}
                      </span>
                      <span className="capitalize">{device.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-mono text-sm">{device.ip}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-2.5 h-2.5 rounded-full ${getStatusColor(device.status)} mr-2`}></div>
                      <span className="capitalize">{device.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">{device.lastSeen}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {device.status !== 'offline' ? (
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 dark:bg-slate-600 rounded-full h-2.5 mr-2">
                          <div 
                            className={`h-2.5 rounded-full ${
                              device.load >= 80 ? 'bg-red-500' : device.load >= 60 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${device.load}%` }}
                          ></div>
                        </div>
                        <span className={`text-sm ${getLoadColor(device.load)}`}>{device.load}%</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500 dark:text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      className={`p-1 rounded-full ${darkMode ? 'hover:bg-slate-600' : 'hover:bg-gray-200'}`}
                    >
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredDevices.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">No devices match your search criteria.</p>
          </div>
        )}
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredDevices.length} of {devices.length} devices
        </div>
        
        <div className="flex space-x-1">
          <button
            className={`px-3 py-1 rounded-lg ${
              darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-gray-100'
            }`}
          >
            Previous
          </button>
          <button
            className="px-3 py-1 rounded-lg bg-blue-600 text-white"
          >
            1
          </button>
          <button
            className={`px-3 py-1 rounded-lg ${
              darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-gray-100'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceManager;