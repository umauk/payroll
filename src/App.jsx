import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { EmployeeProvider } from './context/EmployeeContext'; 
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EmployeeDetail from './pages/EmployeeDetail';
import Payroll from './pages/Payroll';
import Settings from './pages/Settings';
import CategoryList from './pages/CategoryList'; 
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import './App.css';
import EmployeeList from './pages/NempList';


function App() {
  return (
    <EmployeeProvider>
      <Router>
        <div className="app-container">
          <Header />
          <div style={{ display: 'flex', height: '100%' }}>
            <Sidebar className="sidebar" />
            <div className="main-content">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/employees" exact element={<EmployeeList />} />
                <Route path="/employees/:id" element={<EmployeeDetail />} />
                <Route path="/payroll" element={<Payroll />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/categories" element={<CategoryList />} /> 
              </Routes>
            </div>
          </div>
          <Footer />
        </div>
      </Router>
    </EmployeeProvider>
  );
}

export default App;
