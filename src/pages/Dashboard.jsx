import React, { useContext } from 'react';
import { EmployeeContext, useEmployeeContext } from '../context/EmployeeContext'; 
import './Dashboard.css'; 

function Dashboard() {
  const { employees } = useEmployeeContext(); 
  const {islogin,setIsLogin}=useContext(EmployeeContext)

 
  const totalPayrollCost = employees.reduce((acc, employee) => acc + parseFloat(employee.salary || 0), 0);

  return (
    <div className="dashboard-container">
      {islogin?<> <h2>Dashboard</h2>
      <div className="dashboard-info">
        <div className="total">
          <h4>Total Employees: <span>{employees.length}</span></h4>
        </div>
        <div className="payroll">
          <h4>Total Payroll Cost: <span>${totalPayrollCost.toFixed(2)}</span></h4> 
        </div>
      </div></>:<h1>Please login correctly</h1>}
     
    </div>
  );
}

export default Dashboard;
