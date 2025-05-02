import React, { useState, useEffect } from 'react';
import { Search, ZoomIn, ZoomOut, Maximize, Download } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const NetworkMap: React.FC = () => {
  const { darkMode } = useTheme();
  const [zoomLevel, setZoomLevel] = useState(100);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Simulation of network devices for the map
  const devices = [
    { id: 1, type: 'router', name: 'Core Router', x: 50, y: 50 },
    { id: 2, type: 'switch', name: 'Main Switch', x: 50, y: 25 },
    { id: 3, type: 'server', name: 'App Server 1', x: 25, y: 75 },
    { id: 4, type: 'server', name: 'App Server 2', x: 35, y: 75 },
    { id: 5, type: 'server', name: 'Database', x: 45, y: 75 },
    { id: 6, type: 'switch', name: 'Edge Switch 1', x: 75, y: 35 },
    { id: 7, type: 'switch', name: 'Edge Switch 2', x: 75, y: 65 },
    { id: 8, type: 'firewall', name: 'Firewall', x: 85, y: 50 },
  ];
  
  // Connections between devices
  const connections = [
    { from: 1, to: 2 },
    { from: 1, to: 6 },
    { from: 1, to: 7 },
    { from: 1, to: 8 },
    { from: 2, to: 3 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
    { from: 6, to: 8 },
    { from: 7, to: 8 },
  ];
  
  const handleZoomIn = () => {
    if (zoomLevel < 200) setZoomLevel(zoomLevel + 20);
  };
  
  const handleZoomOut = () => {
    if (zoomLevel > 40) setZoomLevel(zoomLevel - 20);
  };
  
  const handleResetZoom = () => {
    setZoomLevel(100);
  };
  
  const getDeviceColor = (type: string) => {
    switch (type) {
      case 'router':
        return 'bg-purple-500';
      case 'switch':
        return 'bg-blue-500';
      case 'server':
        return 'bg-green-500';
      case 'firewall':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  return (
    <div className="h-full">
      <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Network Topology Map</h1>
        
        <div className="flex items-center gap-2">
          <div className={`flex items-center rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-white'} border ${darkMode ? 'border-slate-700' : 'border-gray-300'} px-3 py-1`}>
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search devices..."
              className={`ml-2 outline-none border-none ${darkMode ? 'bg-slate-800' : 'bg-white'}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className={`flex rounded-lg overflow-hidden border ${darkMode ? 'border-slate-700' : 'border-gray-300'}`}>
            <button
              onClick={handleZoomOut}
              className={`p-2 ${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-gray-100'}`}
            >
              <ZoomOut size={16} />
            </button>
            <button
              onClick={handleResetZoom}
              className={`p-2 border-l border-r ${darkMode ? 'border-slate-700 bg-slate-800 hover:bg-slate-700' : 'border-gray-300 bg-white hover:bg-gray-100'}`}
            >
              <Maximize size={16} />
            </button>
            <button
              onClick={handleZoomIn}
              className={`p-2 ${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-gray-100'}`}
            >
              <ZoomIn size={16} />
            </button>
          </div>
          
          <button
            className={`p-2 rounded-lg border ${darkMode ? 'border-slate-700 bg-slate-800 hover:bg-slate-700' : 'border-gray-300 bg-white hover:bg-gray-100'}`}
          >
            <Download size={16} />
          </button>
        </div>
      </div>
      
      <div className={`relative rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-sm h-[calc(100vh-16rem)] overflow-hidden`}>
        <div 
          className="absolute inset-0 p-4 cursor-move" 
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'center center' }}
        >
          {/* Device connections */}
          <svg className="absolute inset-0 w-full h-full">
            {connections.map((connection, index) => {
              const source = devices.find(d => d.id === connection.from);
              const target = devices.find(d => d.id === connection.to);
              
              if (!source || !target) return null;
              
              return (
                <line 
                  key={index}
                  x1={`${source.x}%`}
                  y1={`${source.y}%`}
                  x2={`${target.x}%`}
                  y2={`${target.y}%`}
                  stroke={darkMode ? "#4b5563" : "#9ca3af"}
                  strokeWidth="2"
                  strokeDasharray={Math.random() > 0.7 ? "4 2" : ""}
                />
              );
            })}
          </svg>
          
          {/* Network devices */}
          {devices.map(device => (
            <div 
              key={device.id}
              className={`absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-110`}
              style={{ left: `${device.x}%`, top: `${device.y}%` }}
            >
              <div className={`w-12 h-12 rounded-full ${getDeviceColor(device.type)} flex items-center justify-center text-white font-bold`}>
                {device.type.charAt(0).toUpperCase()}
              </div>
              <div className={`mt-2 px-2 py-1 rounded ${darkMode ? 'bg-slate-700' : 'bg-gray-100'} text-xs whitespace-nowrap`}>
                {device.name}
              </div>
              <div className={`w-2 h-2 rounded-full bg-green-500 absolute top-0 right-0`}></div>
            </div>
          ))}
        </div>
        
        {/* Legend */}
        <div className={`absolute bottom-4 left-4 p-2 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-white'} shadow-md`}>
          <div className="text-sm font-medium mb-1">Legend</div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            {['router', 'switch', 'server', 'firewall'].map(type => (
              <div key={type} className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${getDeviceColor(type)}`}></div>
                <span className="ml-2 text-xs capitalize">{type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex gap-2">
        <div className={`flex-1 p-2 rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-white'} text-sm`}>
          <p><span className="font-medium">Total Devices:</span> {devices.length}</p>
        </div>
        <div className={`flex-1 p-2 rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-white'} text-sm`}>
          <p><span className="font-medium">Active Links:</span> {connections.length}</p>
        </div>
        <div className={`flex-1 p-2 rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-white'} text-sm`}>
          <p><span className="font-medium">Health Status:</span> <span className="text-green-500">Good</span></p>
        </div>
      </div>
    </div>
  );
};

export default NetworkMap;