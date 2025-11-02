import React from 'react';
import { useTheme } from './ThemeContext';

interface NavigationProps {
  currentView: 'tasks' | 'api';
  onViewChange: (view: 'tasks' | 'api') => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  const { theme } = useTheme();

  return (
    <nav className="flex gap-2">
      <button
        onClick={() => onViewChange('tasks')}
        className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
          currentView === 'tasks'
            ? 'bg-blue-500 text-white shadow-md'
            : theme === 'dark'
            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Tasks
      </button>
      <button
        onClick={() => onViewChange('api')}
        className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
          currentView === 'api'
            ? 'bg-green-500 text-white shadow-md'
            : theme === 'dark'
            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        API Demo
      </button>
    </nav>
  );
};

export default Navigation;