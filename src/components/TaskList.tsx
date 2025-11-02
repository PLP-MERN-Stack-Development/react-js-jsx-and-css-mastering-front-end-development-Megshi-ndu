import React from 'react';
// Define Task interface here if not exported from TaskItem
export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

import TaskItem from './TaskItem';
import { useTheme } from './ThemeContext';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask, onDeleteTask }) => {
  const { theme } = useTheme();

  if (tasks.length === 0) {
    return (
      <div className={`text-center py-8 rounded-lg ${
        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
      }`}>
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          No tasks found
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggleTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;