import React, { useState } from 'react';
import { Save, Bell, Shield, Monitor, User, Database, Server, Settings as SettingsIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Settings: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('general');
  
  const tabs = [
    { id: 'general', label: 'General', icon: <SettingsIcon size={18} /> },
    { id: 'alerts', label: 'Alerts & Notifications', icon: <Bell size={18} /> },
    { id: 'security', label: 'Security', icon: <Shield size={18} /> },
    { id: 'monitoring', label: 'Monitoring', icon: <Monitor size={18} /> },
    { id: 'users', label: 'Users & Permissions', icon: <User size={18} /> },
    { id: 'integrations', label: 'Integrations', icon: <Database size={18} /> },
    { id: 'advanced', label: 'Advanced', icon: <Server size={18} /> },
  ];
  
  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Configure system preferences and network optimization parameters.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className={`md:w-60 flex-shrink-0 rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-sm p-2 h-fit`}>
          <nav>
            <ul className="space-y-1">
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center w-full p-2 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : `${darkMode ? 'hover:bg-slate-700 text-white' : 'hover:bg-gray-100 text-gray-800'}`
                    }`}
                  >
                    <span className="mr-3">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        <div className={`flex-1 rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-sm p-6`}>
          {activeTab === 'general' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">General Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Interface Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Dark Mode</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Use dark theme for the interface
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={darkMode}
                          onChange={toggleDarkMode}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div>
                      <p className="font-medium mb-2">Data Refresh Rate</p>
                      <select
                        className={`block w-full rounded-lg border px-3 py-2 ${
                          darkMode 
                            ? 'bg-slate-700 border-slate-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      >
                        <option value="10">Every 10 seconds</option>
                        <option value="30">Every 30 seconds</option>
                        <option value="60">Every minute</option>
                        <option value="300">Every 5 minutes</option>
                        <option value="0">Manual refresh only</option>
                      </select>
                    </div>
                    
                    <div>
                      <p className="font-medium mb-2">Default Dashboard View</p>
                      <select
                        className={`block w-full rounded-lg border px-3 py-2 ${
                          darkMode 
                            ? 'bg-slate-700 border-slate-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      >
                        <option value="overview">Overview</option>
                        <option value="performance">Performance Focus</option>
                        <option value="security">Security Focus</option>
                        <option value="devices">Device Management</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-slate-700 pt-6">
                  <h3 className="text-lg font-medium mb-3">AI Optimization Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Automated Optimization</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Allow AI to automatically optimize network settings
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div>
                      <p className="font-medium mb-2">Optimization Aggressiveness</p>
                      <div className="flex items-center">
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Conservative</span>
                        <input
                          type="range"
                          min="1"
                          max="5"
                          value="3"
                          className="mx-4 flex-1"
                        />
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Aggressive</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="font-medium mb-2">Optimization Schedule</p>
                      <select
                        className={`block w-full rounded-lg border px-3 py-2 ${
                          darkMode 
                            ? 'bg-slate-700 border-slate-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      >
                        <option value="continuous">Continuous (Real-time)</option>
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily (Off hours)</option>
                        <option value="weekly">Weekly (Weekend)</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-slate-700 pt-6">
                  <h3 className="text-lg font-medium mb-3">Network Discovery</h3>
                  <div>
                    <p className="font-medium mb-2">Discovery Interval</p>
                    <select
                      className={`block w-full rounded-lg border px-3 py-2 ${
                        darkMode 
                          ? 'bg-slate-700 border-slate-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="6">Every 6 hours</option>
                      <option value="12">Every 12 hours</option>
                      <option value="24">Daily</option>
                      <option value="168">Weekly</option>
                    </select>
                    <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      How often the system should scan for new devices and topology changes.
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  >
                    <Save size={18} />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab !== 'general' && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className={`p-4 rounded-full ${darkMode ? 'bg-slate-700' : 'bg-gray-100'} mb-4`}>
                {tabs.find(tab => tab.id === activeTab)?.icon}
              </div>
              <h3 className="text-xl font-medium">{tabs.find(tab => tab.id === activeTab)?.label}</h3>
              <p className={`mt-2 text-center max-w-md ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                This settings section is available in the enterprise version.
              </p>
              <button
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Upgrade to Enterprise
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;