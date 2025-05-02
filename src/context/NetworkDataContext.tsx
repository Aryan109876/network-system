import React, { createContext, useContext, useState, useCallback } from 'react';

interface NetworkStatus {
  health: string;
  bandwidth: string;
  latency: string;
  alerts: string;
  devices: number;
  uptime: string;
}

interface NetworkDataContextType {
  networkStatus: NetworkStatus | null;
  loadNetworkData: () => void;
  isLoading: boolean;
}

const NetworkDataContext = createContext<NetworkDataContextType | undefined>(undefined);

export const NetworkDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const loadNetworkData = useCallback(() => {
    setIsLoading(true);
    
    // Simulate API call to get network data
    setTimeout(() => {
      const mockData: NetworkStatus = {
        health: `${Math.floor(Math.random() * 10) + 85}%`,
        bandwidth: `${(Math.random() * 5 + 2).toFixed(1)} Gbps`,
        latency: `${Math.floor(Math.random() * 10) + 20}ms`,
        alerts: `${Math.floor(Math.random() * 5)}`,
        devices: Math.floor(Math.random() * 20) + 30,
        uptime: '99.98%'
      };
      
      setNetworkStatus(mockData);
      setIsLoading(false);
    }, 500);
  }, []);
  
  return (
    <NetworkDataContext.Provider value={{ networkStatus, loadNetworkData, isLoading }}>
      {children}
    </NetworkDataContext.Provider>
  );
};

export const useNetworkData = (): NetworkDataContextType => {
  const context = useContext(NetworkDataContext);
  if (context === undefined) {
    throw new Error('useNetworkData must be used within a NetworkDataProvider');
  }
  return context;
};