import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/index.jsx';
import Dashboard from './pages/Dashboard/index.jsx';
import Register from './pages/Register/index.jsx';
import ProtectedRoute from './components/common/ProtectedRoute/index.jsx';
import PublicRoute from './components/common/PublicRoute/index.jsx';
import Header from './components/layout/Header.jsx';
import PhotographerDetailsUI from './pages/PhotographerProfile/index.jsx';

const AppRoutes = () => {
  return (
    <>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Vendor Routes */}
        <Route path="/vendor/register" element={<Register isVendor />} />

        {/* Service Category Routes */}
        <Route path="/photographers" element={<Home />} />
        <Route path="/makeup-artists" element={<Home />} />
        <Route path="/planners" element={<Home />} />
        <Route path="/decorators" element={<Home />} />
        <Route path="/caterers" element={<Home />} />
        <Route path="/jewellery" element={<Home />} />
        <Route path="/wedding-wear" element={<Home />} />
        <Route path="/entertainment" element={<Home />} />
        <Route path="/gifts" element={<Home />} />
        <Route path="/honeymoon" element={<Home />} />
        <Route path="/car" element={<Home />} />
        <Route path="/choreographers" element={<Home />} />

        {/* Photographer Details Route */}
        <Route
          path="/photographers/:id"
          element={
            <PublicRoute>
              <PhotographerDetailsUI />
            </PublicRoute>
          }
        />
      </Routes>
    </>
  );
};

export default AppRoutes; 