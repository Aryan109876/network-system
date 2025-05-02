import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Network, 
  Server, 
  BarChart2, 
  Settings,
  LogOut
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';

const Sidebar: React.FC = () => {
  const { darkMode } = useTheme();
  const { logout } = useUser();
  
  const navItems = [
    { to: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/network-map', icon: <Network size={20} />, label: 'Network Map' },
    { to: '/devices', icon: <Server size={20} />, label: 'Devices' },
    { to: '/analytics', icon: <BarChart2 size={20} />, label: 'Analytics' },
    { to: '/settings', icon: <Settings size={20} />, label: 'Settings' }
  ];

  return (
    <aside className={`w-16 md:w-64 ${darkMode ? 'bg-slate-800' : 'bg-white'} border-r ${darkMode ? 'border-slate-700' : 'border-gray-200'} flex flex-col`}>
      <div className="flex items-center justify-center md:justify-start p-4 border-b border-gray-200">
        <div className="hidden md:block">
          <h1 className="text-xl font-bold text-blue-600">NetOptimize</h1>
          <p className="text-xs text-gray-500">AI-Powered Network Management</p>
        </div>
        <div className="block md:hidden">
          <Network className="text-blue-600 cursor-pointer hover:text-blue-700 transition-colors" size={28} />
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink 
                to={item.to} 
                className={({ isActive }) => 
                  `flex items-center p-2 rounded-lg transition-colors cursor-pointer ${
                    isActive 
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' 
                      : `${darkMode ? 'text-gray-300 hover:bg-slate-700' : 'text-gray-700 hover:bg-gray-100'}`
                  }`
                }
                end={item.to === '/'}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span className="ml-3 hidden md:block">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button 
          onClick={logout}
          className={`flex items-center p-2 w-full rounded-lg transition-colors cursor-pointer ${
            darkMode 
              ? 'hover:bg-slate-700 text-gray-300 hover:text-white' 
              : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
          }`}
        >
          <LogOut size={20} />
          <span className="ml-3 hidden md:block">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;