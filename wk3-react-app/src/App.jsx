import React from 'react';
import './App.css';
import TaskManager from '../components/TaskManager.tsx';
import { ThemeProvider } from '../components/ThemeContext.tsx';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <ThemeProvider>
          <TaskManager />
        </ThemeProvider>
      </div>
    </div>
  );
}

export default App;
