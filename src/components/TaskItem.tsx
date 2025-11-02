import React from 'react';
type Task = {
  id: string;
  title: string;
  completed: boolean;
};
import { useTheme } from './ThemeContext';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  const { theme } = useTheme();

  return (
    <div className={`flex items-center gap-3 p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
      theme === 'dark'
        ? 'bg-gray-700 border-gray-600 hover:bg-gray-650'
        : 'bg-white border-gray-200 hover:bg-gray-50'
    } ${task.completed ? 'opacity-60' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500"
      />
      
      <span className={`flex-1 ${task.completed ? 'line-through' : ''} ${
        theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
      }`}>
        {task.title}
      </span>
      
      <button
        onClick={() => onDelete(task.id)}
        className="p-2 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors duration-200"
        aria-label="Delete task"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
};

export default TaskItem;