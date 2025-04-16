import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './store/index.js';
import AppRoutes from './router.jsx';
import MainLayout from './layouts/MainLayout/index.jsx';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <MainLayout>
            <AppRoutes />
          </MainLayout>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
