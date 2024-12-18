import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmployeeContext, useEmployeeContext } from '../context/EmployeeContext';
import './EmployeeList.css';

function EmployeeList() {
  const { employees, addEmployee, deleteEmployee, updateEmployee } = useEmployeeContext();
  const {islogin,setIsLogin}=useContext(EmployeeContext)
  const navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState({
    name: '',
    address: '',
    city: '',
    pincode: '',
    mobileNumber: '',
    highestDegree: '',
    designation: '',
    typeOfDesignation: '',
    class: '',
    basicPay: '',
    salary: '',
    bankAccount: '',
    email: '',
    password: '',
    confirmPassword: '',
    profileImage: '', // New field for image upload
  });

  const [classes, setClasses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editEmployeeId, setEditEmployeeId] = useState(null);

  useEffect(() => {
    const storedClasses = localStorage.getItem('categories');
    if (storedClasses) {
      setClasses(JSON.parse(storedClasses));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({ ...prevData, [name]: value }));

    if (name === 'class') {
      const selectedClass = classes.find((cls) => cls.className === value);
      if (selectedClass) {
        setEmployeeData((prevData) => ({
          ...prevData,
          basicPay: selectedClass.basicPay,
          salary: selectedClass.salary,
        }));
      }
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEmployeeData((prevData) => ({
          ...prevData,
          profileImage: reader.result, // Convert image to Base64
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddEmployee = () => {
    const { password, confirmPassword } = employeeData;

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const newEmployee = {
      ...employeeData,
      id: isEditing ? editEmployeeId : employees.length + 1,
    };

    if (isEditing) {
      updateEmployee(newEmployee);
      alert('Employee updated successfully!');
    } else {
      addEmployee(newEmployee);
      alert('Employee added successfully!');
    }

    resetForm();
  };

  const resetForm = () => {
    setEmployeeData({
      name: '',
      address: '',
      city: '',
      pincode: '',
      mobileNumber: '',
      highestDegree: '',
      designation: '',
      typeOfDesignation: '',
      class: '',
      basicPay: '',
      salary: '',
      bankAccount: '',
      email: '',
      password: '',
      confirmPassword: '',
      profileImage: '', 
    });
    setIsEditing(false);
    setEditEmployeeId(null);
  };

  const handleEditEmployee = (id) => {
    const employeeToEdit = employees.find((emp) => emp.id === id);
    if (employeeToEdit) {
      setEmployeeData(employeeToEdit);
      setIsEditing(true);
      setEditEmployeeId(id);
    }
  };

  const handleDeleteEmployee = (id) => {
    deleteEmployee(id);
    alert('Employee deleted successfully!');
  };
 
  const handleBack=()=>{
    navigate("/")
  }
  return (
    <div className="employee-list-container">
      {islogin?<><h2>Employee Management</h2>

<div className="employee-form">
 
  <input
    type="text"
    name="name"
    value={employeeData.name}
    onChange={handleChange}
    placeholder="Name"
  />
  <input
    type="text"
    name="address"
    value={employeeData.address}
    onChange={handleChange}
    placeholder="Address"
  />
  <input
    type="text"
    name="city"
    value={employeeData.city}
    onChange={handleChange}
    placeholder="City"
  />
  <input
    type="text"
    name="pincode"
    value={employeeData.pincode}
    onChange={handleChange}
    placeholder="Pincode"
  />
  <input
    type="text"
    name="mobileNumber"
    value={employeeData.mobileNumber}
    onChange={handleChange}
    placeholder="Mobile Number"
  />
  <input
    type="text"
    name="highestDegree"
    value={employeeData.highestDegree}
    onChange={handleChange}
    placeholder="Highest Degree"
  />
  <input
    type="text"
    name="designation"
    value={employeeData.designation}
    onChange={handleChange}
    placeholder="Designation"
  />
  <input
    type="text"
    name="typeOfDesignation"
    value={employeeData.typeOfDesignation}
    onChange={handleChange}
    placeholder="Type of Designation"
  />
  <select name="class" value={employeeData.class} onChange={handleChange}>
    <option value="">Select Class</option>
    {classes.map((cls) => (
      <option key={cls.className} value={cls.className}>
        {cls.className}
      </option>
    ))}
  </select>
  <input
    type="number"
    name="basicPay"
    value={employeeData.basicPay}
    onChange={handleChange}
    placeholder="Basic Pay"
    disabled
  />
  <input
    type="number"
    name="salary"
    value={employeeData.salary}
    onChange={handleChange}
    placeholder="Salary"
    disabled
  />
  <input
    type="text"
    name="bankAccount"
    value={employeeData.bankAccount}
    onChange={handleChange}
    placeholder="Bank Account"
  />
  <input
    type="email"
    name="email"
    value={employeeData.email}
    onChange={handleChange}
    placeholder="Email"
  />
  <input
    type="password"
    name="password"
    value={employeeData.password}
    onChange={handleChange}
    placeholder="Password"
  />
  <input
    type="password"
    name="confirmPassword"
    value={employeeData.confirmPassword}
    onChange={handleChange}
    placeholder="Confirm Password"
  />
  <input
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
    placeholder="Upload Profile Image"
  />
  <button onClick={handleAddEmployee}>
    {isEditing ? 'Update' : 'Add'} Employee
  </button>
  <button onClick={resetForm}>Cancel</button>
</div>

<div className="employee-table-container">
  <table className="employee-table">
    <thead>
      <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Email</th>
        <th>Designation</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {employees.map((employee) => (
        <tr key={employee.id}>
          <td>
            {employee.profileImage && (
              <img
                src={employee.profileImage}
                alt="Profile"
                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
              />
            )}
          </td>
          <td>{employee.name}</td>
          <td>{employee.email}</td>
          <td>{employee.designation}</td>
          <td>
            <button onClick={() => handleEditEmployee(employee.id)}>Edit</button>
            <button onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
            <button onClick={() => navigate(`/employees/${employee.id}`)}>View More</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div></>:
<>
<h1>Please Login Correctly</h1>
<button onClick={handleBack}>Back</button>
</>}
      
    </div>
  );
}

export default EmployeeList;
