import React, { useContext, useState } from "react";
import { jsPDF } from "jspdf";
import { EmployeeContext } from "../context/EmployeeContext";
import { useNavigate } from "react-router-dom";
import './Payroll.css'; // Import CSS file for animations

function Payroll() {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const { islogin, setIsLogin } = useContext(EmployeeContext);
  const navigate = useNavigate();

  const searchHandler = () => {
    const data = localStorage.getItem("employees");
    const response = JSON.parse(data);
    setFilteredData(
      response.filter((i) => {
        if (i.name === search) {
          return i;
        }
        return null;
      })
    );
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    filteredData.forEach((entry, index) => {
      const yOffset = index * 120 + 10; // Add spacing between employee details
      doc.text(`Employee Details (${entry.name})`, 10, yOffset);
      doc.text(`Personal Details:`, 10, yOffset + 10);
      doc.text(`Name: ${entry.name}`, 10, yOffset + 20);
      doc.text(`Address: ${entry.address}`, 10, yOffset + 30);
      doc.text(`City: ${entry.city}`, 10, yOffset + 40);
      doc.text(`Pincode: ${entry.pincode}`, 10, yOffset + 50);
      doc.text(`Mobile Number: ${entry.mobileNumber}`, 10, yOffset + 60);
      doc.text(`Highest Degree: ${entry.highestDegree}`, 10, yOffset + 70);
      doc.text(`Designation: ${entry.designation}`, 10, yOffset + 80);
      doc.text(`Type of Designation: ${entry.typeOfDesignation}`, 10, yOffset + 90);
      doc.text(`Class: ${entry.class}`, 10, yOffset + 100);

      doc.text(`Payroll Details:`, 10, yOffset + 110);
      doc.text(`Basic Pay: ${entry.basicPay}`, 10, yOffset + 120);
      doc.text(`Salary: ${entry.salary}`, 10, yOffset + 130);
      doc.text(`Bank Account No: ${entry.bankAccount}`, 10, yOffset + 140);
      doc.text(`Email: ${entry.email}`, 10, yOffset + 150);
      doc.text(`ID: ${entry.id}`, 10, yOffset + 160);
      doc.text(`EPFO Number: ${entry.epfoNumber}`, 10, yOffset + 170);
      doc.text(`Net Salary: ${entry.salary - 1800} (Salary - Deductions)`, 10, yOffset + 180);

      if (index !== filteredData.length - 1) {
        doc.addPage();
      }
    });

    doc.save("Payroll_Details.pdf");
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="container">
      {islogin ? (
        <>
          <h2 className="heading">Payroll</h2>
          <div className="searchContainer">
            <input
              type="text"
              value={search}
              placeholder="Enter Employee Name"
              onChange={(e) => setSearch(e.target.value)}
              className="input"
            />
            <button onClick={searchHandler} className="button">
              Search
            </button>
          </div>
          {filteredData.length > 0 && (
            <>
              <button onClick={downloadPDF} className="downloadButton">
                Download as PDF
              </button>
              {filteredData.map((entry) => (
                <div key={entry.id} className="card">
                  <div className="imageContainer">
                    {entry.profileImage ? (
                      <img
                        src={entry.profileImage}
                        alt="Employee"
                        className="image"
                      />
                    ) : (
                      <p className="noImageText">No Image Available</p>
                    )}
                  </div>
                  <div className="row">
                    <div className="section">
                      <h3 className="subHeading">Personal Details</h3>
                      <ul className="list">
                        <li>Name: {entry.name}</li>
                        <li>Address: {entry.address}</li>
                        <li>City: {entry.city}</li>
                        <li>Pincode: {entry.pincode}</li>
                        <li>Mobile Number: {entry.mobileNumber}</li>
                        <li>Highest Degree: {entry.highestDegree}</li>
                        <li>Designation: {entry.designation}</li>
                        <li>Type of Designation: {entry.typeOfDesignation}</li>
                        <li>Class: {entry.class}</li>
                      </ul>
                    </div>
                    <div className="section">
                      <h3 className="subHeading">Payroll Details</h3>
                      <ul className="list">
                        <li>Basic Pay: {entry.basicPay}</li>
                        <li>Salary: {entry.salary}</li>
                        <li>Bank Account No: {entry.bankAccount}</li>
                        <li>Email: {entry.email}</li>
                        <li>ID: {entry.id}</li>
                        <li>EPFO Number: {entry.epfoNumber}</li>
                        <li>Net Salary: {entry.salary - 1800} (Salary - Deductions)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </>
      ) : (
        <>
          <h1>Please Login correctly</h1>
          <button onClick={handleBack}>Back</button>
        </>
      )}
    </div>
  );
}

export default Payroll;
