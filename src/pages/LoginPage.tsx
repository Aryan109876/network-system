import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Network, Shield, Lock, AtSign } from 'lucide-react';
import { useUser } from '../context/UserContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate login API call
    setTimeout(() => {
      if (email === 'admin@example.com' && password === 'password') {
        login({
          id: '1',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'Administrator'
        });
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-slate-900">
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full px-6 py-8">
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white">
                <Network size={24} />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">NetOptimize</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">AI-Powered Network Management</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Sign In</h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <AtSign size={16} className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={16} className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
                }`}
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
            
            <div className="mt-4 flex items-center justify-center">
              <Shield size={14} className="text-gray-400 mr-1" />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Secured by enterprise-grade encryption
              </span>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?
            </span>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 ml-1">
              Contact your administrator
            </a>
          </div>
        </div>
      </div>
      
      <div className="hidden lg:block lg:w-1/2 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {/* Network pattern background - simplified representation */}
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Simulated network nodes and connections */}
            <circle cx="20" cy="20" r="1" fill="white" />
            <circle cx="50" cy="30" r="1" fill="white" />
            <circle cx="80" cy="15" r="1" fill="white" />
            <circle cx="30" cy="60" r="1" fill="white" />
            <circle cx="70" cy="70" r="1" fill="white" />
            <circle cx="40" cy="85" r="1" fill="white" />
            <line x1="20" y1="20" x2="50" y2="30" stroke="white" strokeWidth="0.3" />
            <line x1="50" y1="30" x2="80" y2="15" stroke="white" strokeWidth="0.3" />
            <line x1="30" y1="60" x2="50" y2="30" stroke="white" strokeWidth="0.3" />
            <line x1="30" y1="60" x2="70" y2="70" stroke="white" strokeWidth="0.3" />
            <line x1="70" y1="70" x2="40" y2="85" stroke="white" strokeWidth="0.3" />
          </svg>
        </div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center px-12 text-white">
          <h2 className="text-4xl font-bold mb-6">AI-Powered Network Optimization</h2>
          <p className="text-xl mb-8 max-w-md text-center">
            Real-time monitoring, intelligent analysis, and automated optimization for your entire network infrastructure.
          </p>
          
          <div className="grid grid-cols-2 gap-6 max-w-xl">
            {[
              { title: "Advanced Monitoring", description: "Real-time visibility across your entire network" },
              { title: "Intelligent Optimization", description: "AI-driven improvements to network performance" },
              { title: "Security Insights", description: "Detect and respond to anomalies instantly" },
              { title: "Predictive Analytics", description: "Anticipate issues before they impact users" }
            ].map((feature, index) => (
              <div key={index} className="bg-white bg-opacity-10 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                <p className="text-sm opacity-90">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;