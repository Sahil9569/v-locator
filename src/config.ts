export type ConfigProps = {
  Sidebar_drawer: any;
  Customizer_drawer: boolean;
  mini_sidebar: boolean;
  setHorizontalLayout: boolean;
  setRTLLayout: boolean;
  actTheme: string;
  boxed: boolean;
  setBorderCard: boolean;
};

// Factory function to create different configs based on the role
function createConfig(role: string | null): ConfigProps {
  const config: ConfigProps = {
    Sidebar_drawer: null,
    Customizer_drawer: false,
    mini_sidebar: false,
    setHorizontalLayout: false,
    setRTLLayout: false,
    actTheme: 'BLUE_THEME',
    boxed: true,
    setBorderCard: false,
  };

  if (role === 'customer') {
    // Customize the config for customers
    config.actTheme = 'DARK_BLUE_THEME';
    // Add other customizations as needed
  } else {
    // For other roles, the default config is used
    // No need to change anything
  }

  return config;
}

// Get the role from localStorage
const authToken = localStorage.getItem('role');
const config = createConfig(authToken);

export default config;