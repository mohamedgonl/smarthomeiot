import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Login } from 'pages/Login';
import { Statistics } from 'pages/Statistic';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useStore } from 'store/hooks';
import { Home } from './pages/Home';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const AuthRoute = ({ type, children }) => {
  const [{ accountId }] = useStore();

  if (type === 'PRIVATE' && !accountId) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Routes>
        <Route
          path="/"
          element={
            <AuthRoute type="PRIVATE">
              <Home />
            </AuthRoute>
          }
        />
        <Route
          path="/statistic"
          element={
            <AuthRoute type="PRIVATE">
              <Statistics />
            </AuthRoute>
          }
        />
        <Route
          path="/login"
          element={
            <AuthRoute type="GUEST">
              <Login />
            </AuthRoute>
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
