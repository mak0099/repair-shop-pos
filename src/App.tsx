import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AppLayout } from './components/layout/AppLayout';
import { AppRoutes } from './routes/AppRoutes';

// Create a default theme for the entire application
const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </ThemeProvider>
  );
}

export default App;