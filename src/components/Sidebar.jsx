import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <nav>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/categories">Employee Categories</Link></li>
        <li><Link to="/employees">Employee List</Link></li>
        <li><Link to="/payroll">Payroll</Link></li>
        <li><Link to="/settings">Settings</Link></li>
   
      </ul>
    </nav>
  );
}

export default Sidebar;
