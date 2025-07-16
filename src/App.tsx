import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './app/dashboard/index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />
        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />
    
      </Routes>
    </BrowserRouter>
  );
}

export default App;
