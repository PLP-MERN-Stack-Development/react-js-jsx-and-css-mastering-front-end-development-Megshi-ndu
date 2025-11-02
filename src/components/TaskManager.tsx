import React, { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useTheme } from './ThemeContext';
type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};
import TaskList from './TaskList';
import TaskFilter, { FilterType } from './TaskFilter';
import TaskInput from './TaskInput';
import Stats from './Stats';

const TaskManager: React.FC = () => {
  const { theme } = useTheme();
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [filter, setFilter] = useState<FilterType>('all');

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date(),
    };
    setTasks(prev => [...prev, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(prev => prev.filter(task => !task.completed));
  };

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'active':
        return !task.completed;
      case 'completed':
        return task.completed;
      default:
        return true;
    }
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className={`rounded-lg shadow-lg p-6 transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Task Manager
          </h1>
          
          <TaskInput onAddTask={addTask} />
          <Stats tasks={tasks} />
          <TaskFilter currentFilter={filter} onFilterChange={setFilter} />
          <TaskList
            tasks={filteredTasks}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
          />
          
          {tasks.some(task => task.completed) && (
            <div className="mt-4 text-center">
              <button
                onClick={clearCompleted}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                Clear Completed
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;