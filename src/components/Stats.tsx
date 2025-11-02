import React from 'react';
import { useTheme } from './ThemeContext';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface StatsProps {
  tasks: Task[];
}

const Stats: React.FC<StatsProps> = ({ tasks }) => {
  const { theme } = useTheme();
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const active = total - completed;

  return (
    <div className={`grid grid-cols-3 gap-4 mb-6 p-4 rounded-lg ${
      theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
    }`}>
      <div className="text-center">
        <div className={`text-2xl font-bold ${
          theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
        }`}>
          {total}
        </div>
        <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Total
        </div>
      </div>
      <div className="text-center">
        <div className={`text-2xl font-bold ${
          theme === 'dark' ? 'text-green-400' : 'text-green-600'
        }`}>
          {active}
        </div>
        <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Active
        </div>
      </div>
      <div className="text-center">
        <div className={`text-2xl font-bold ${
          theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
        }`}>
          {completed}
        </div>
        <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Completed
        </div>
      </div>
    </div>
  );
};

export default Stats;