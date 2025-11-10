React Task Manager

A modern React + Vite application for managing tasks efficiently. This project leverages Vite for lightning-fast development, Tailwind CSS for styling, and TypeScript for a type-safe developer experience.

🚀 Features

⚛️ Built with React 18 and Vite

🎨 Styled with Tailwind CSS

🧠 Type-safe using TypeScript

⚡️ Instant Hot Module Replacement (HMR)

🔧 Minimal configuration, ready to scale

🧩 Utility libraries like clsx for dynamic class management

📁 Project Structure

react-task-manager/
├── src/
│   ├── components/        # Reusable React components
│   ├── pages/             # App pages or views
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Entry point
│   └── index.css          # Tailwind base styles
├── public/                # Static assets
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
├── tsconfig.json          # TypeScript settings
└── vite.config.js         # Vite configuration


⚙️ Configuration Overview

package.json
{
  "name": "react-task-manager",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.3.0",
    "typescript": "^5.0.0",
    "vite": "^4.4.0"
  }
}

Vite powers the build and development server.

Tailwind CSS and PostCSS handle utility-based styling.

TypeScript ensures type safety and better IDE support.

🧰 Installation & Setup

Clone the repository:

git clone https://github.com/yourusername/react-task-manager.git
cd react-task-manager

Install dependencies:

npm install

Run the development server:

npm run dev

Build for production:

npm run build

Preview the production build:

npm run preview
🎨 Tailwind Setup

Create or update index.css with the following content:

@tailwind base;
@tailwind components;
@tailwind utilities;

You can now use Tailwind classes directly in your React components:

<h1 className="text-3xl font-bold text-indigo-600">Welcome to Task Manager</h1>
🔍 Development Notes

Use clsx for cleaner conditional class handling:

import clsx from "clsx";

<button className={clsx("px-4 py-2", isActive && "bg-green-500")}>
  Click Me
</button>;

Customize your Tailwind theme in tailwind.config.js.

Type checking runs automatically with TypeScript.

🧩 Recommended Extensions

ESLint + Prettier for consistent code formatting

React Router for navigation

Zustand or Redux Toolkit for state management

📝 License

This project is open-source under the MIT License.

Author: [Margaret Ndung'u]
Built with ❤️ using React, Vite, and Tailwind CSS

Github pages publishing link:  plp-mern-stack-development.github.io.
