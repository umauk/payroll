import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEmployeeContext } from "../context/EmployeeContext";
import "./EmployeeDetail.css";

function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees } = useEmployeeContext();
  const employee = employees.find((emp) => emp.id === parseInt(id));

  const providentFund = 1800; // Provident Fund fixed deduction
  const netSalary = employee ? employee.salary - providentFund : 0;

  if (!employee) {
    return <p>Employee not found!</p>;
  }

  return (
    <div className="employee-detail-container">
      <h2>Employee Details</h2>
      {Object.entries(employee)
        .filter(([key]) => key !== "profileImage") // Exclude profileImage
        .map(([key, value]) => (
          <p key={key}>
            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
          </p>
        ))}
      <p>
        <strong>Provident Fund - Employee Contribution:</strong> {providentFund}/-
      </p>
      <p className="net-salary">
        <strong>Net Salary:</strong> {netSalary}/-
      </p>
      <button onClick={() => navigate("/employees")} className="back-button">
        Back to Employee List
      </button>
    </div>
  );
}

export default EmployeeDetail;

