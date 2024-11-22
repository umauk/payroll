import React, { useContext, useState } from "react";
import { jsPDF } from "jspdf";
import { EmployeeContext } from "../context/EmployeeContext";
import { useNavigate } from "react-router-dom";


function Payroll() {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const {islogin,setIsLogin}=useContext(EmployeeContext)
  const navigate=useNavigate()

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

  const handleBack=()=>{
    navigate("/")
  }

  return (
    <div style={styles.container}>
      {islogin?<><h2 style={styles.heading}>Payroll</h2>
      <div style={styles.searchContainer}>
        <input
          type="text"
          value={search}
          placeholder="Enter Employee Name"
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />
        <button onClick={searchHandler} style={styles.button}>
          Search
        </button>
      </div>
      {filteredData.length > 0 && (
        <>
          <button onClick={downloadPDF} style={styles.downloadButton}>
            Download as PDF
          </button>
          {filteredData.map((entry) => (
            <div key={entry.id} style={styles.card}>
              <div style={styles.imageContainer}>
                {entry.profileImage ? (
                  <img
                    src={entry.profileImage}
                    alt="Employee"
                    style={styles.image}
                  />
                ) : (
                  <p style={styles.noImageText}>No Image Available</p>
                )}
              </div>
              <div style={styles.row}>
                <div style={styles.section}>
                  <h3 style={styles.subHeading}>Personal Details</h3>
                  <ul style={styles.list}>
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
                <div style={styles.section}>
                  <h3 style={styles.subHeading}>Payroll Details</h3>
                  <ul style={styles.list}>
                    <li>Basic Pay: {entry.basicPay}</li>
                    <li>Salary: {entry.salary}</li>
                    <li>Bank Account No: {entry.bankAccount}</li>
                    <li>Email: {entry.email}</li>
                    <li>ID: {entry.id}</li>
                    <li>EPFO Number: {entry.epfoNumber}</li> {/* EPFO Number added */}
                    <li>Net Salary: {entry.salary - 1800} (Salary - Deductions)</li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </>
      )}</>:
      <>
      <h1>Please Login correctly</h1>
      <button onClick={handleBack}>Back</button></>}
      
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginRight: "10px",
    width: "300px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "#fff",
    cursor: "pointer",
  },
  downloadButton: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#2196F3",
    color: "#fff",
    cursor: "pointer",
    marginBottom: "20px",
    display: "block",
    margin: "0 auto",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    margin: "20px 0",
    padding: "20px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
  },
  imageContainer: {
    textAlign: "center",
    marginBottom: "20px",
  },
  image: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  noImageText: {
    fontSize: "14px",
    color: "#888",
  },
  section: {
    flex: 1,
  },
  subHeading: {
    fontSize: "18px",
    color: "#4CAF50",
    marginBottom: "10px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    lineHeight: "1.6",
    fontSize: "16px",
    color: "#555",
  },
};

export default Payroll;
