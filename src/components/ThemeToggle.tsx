import { Button } from './Button';
import { useTheme } from './ThemeContext';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  // Handle potential undefined context
  if (!setTheme) {
    return (
      <Button disabled>
        Theme not available
      </Button>
    );
  }

  const toggleTheme = () => {
    try {
      setTheme(theme === 'light' ? 'dark' : 'light');
    } catch (error) {
      console.error('Failed to toggle theme:', error);
    }
  };

  const oppositeTheme = theme === 'light' ? 'Dark' : 'Light';

  return (
    <Button
      onClick={toggleTheme}
      aria-label={`Switch to ${oppositeTheme.toLowerCase()} mode`}
      title={`Current mode: ${theme}`}
    >
      Switch to {oppositeTheme} Mode
    </Button>
  );
};

export default ThemeToggle;