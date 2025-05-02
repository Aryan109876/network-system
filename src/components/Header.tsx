import React from 'react';
import { Bell, Moon, Sun, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';

const Header: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { user } = useUser();
  
  const handleNotificationsClick = () => {
    // Implement notifications panel toggle
    console.log('Notifications clicked');
  };

  const handleProfileClick = () => {
    // Implement profile menu toggle
    console.log('Profile clicked');
  };
  
  return (
    <header className={`h-16 ${darkMode ? 'bg-slate-800' : 'bg-white'} border-b ${darkMode ? 'border-slate-700' : 'border-gray-200'} flex items-center justify-between px-4 md:px-6`}>
      <div>
        <h2 className="text-lg font-semibold">Network Command Center</h2>
      </div>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={handleNotificationsClick}
          className={`relative p-2 rounded-full transition-colors ${
            darkMode 
              ? 'hover:bg-slate-700 text-gray-300 hover:text-white' 
              : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
          } cursor-pointer`}
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full transition-colors ${
            darkMode 
              ? 'hover:bg-slate-700 text-gray-300 hover:text-white' 
              : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
          } cursor-pointer`}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <button
          onClick={handleProfileClick}
          className="flex items-center cursor-pointer group"
        >
          <div className="hidden md:block mr-2 text-right">
            <p className="text-sm font-medium">{user?.name || 'Guest'}</p>
            <p className="text-xs text-gray-500">{user?.role || 'Viewer'}</p>
          </div>
          <div className={`w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center transition-colors ${
            darkMode 
              ? 'text-blue-600 group-hover:bg-blue-200' 
              : 'text-blue-700 group-hover:bg-blue-200'
          }`}>
            <User size={20} />
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;