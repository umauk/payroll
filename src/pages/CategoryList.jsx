import React, { useState, useEffect, useContext } from 'react';
import './CategoryList.css';
import { EmployeeContext } from '../context/EmployeeContext';
import { useNavigate } from 'react-router-dom';

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [className, setClassName] = useState('');
  const [basicPay, setBasicPay] = useState('');
  const [medicalAllowance, setMedicalAllowance] = useState('');
  const [travelAllowance, setTravelAllowance] = useState('');
  const [houseRentAllowance, setHouseRentAllowance] = useState('');
  const [conveyanceAllowance, setConveyanceAllowance] = useState('');
  const [specialAllowance, setSpecialAllowance] = useState('');
  const [annualIncentive, setAnnualIncentive] = useState('');
  const [advanceStatutoryBonus, setAdvanceStatutoryBonus] = useState('');
  const [salary, setSalary] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const {islogin,setIsLogin}=useContext(EmployeeContext)
  const navigate=useNavigate()

 
  useEffect(() => {
    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  
  const syncWithLocalStorage = (updatedCategories) => {
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
  };

  const resetForm = () => {
    setClassName('');
    setBasicPay('');
    setMedicalAllowance('');
    setTravelAllowance('');
    setHouseRentAllowance('');
    setConveyanceAllowance('');
    setSpecialAllowance('');
    setAnnualIncentive('');
    setAdvanceStatutoryBonus('');
    setSalary('');
    setIsEditing(false);
    setEditCategoryId(null);
  };

  
  useEffect(() => {
    const calculatedSalary =
      Number(basicPay) +
      Number(medicalAllowance) +
      Number(travelAllowance) +
      Number(houseRentAllowance) +
      Number(conveyanceAllowance) +
      Number(specialAllowance) +
      Number(annualIncentive) +
      Number(advanceStatutoryBonus);
    setSalary(calculatedSalary || '');
  }, [
    basicPay,
    medicalAllowance,
    travelAllowance,
    houseRentAllowance,
    conveyanceAllowance,
    specialAllowance,
    annualIncentive,
    advanceStatutoryBonus,
  ]);

  
  const handleAddCategory = () => {
    if (
      className &&
      basicPay &&
      medicalAllowance &&
      travelAllowance &&
      houseRentAllowance &&
      conveyanceAllowance &&
      specialAllowance &&
      annualIncentive &&
      advanceStatutoryBonus
    ) {
      const newCategory = {
        id: categories.length + 1,
        className,
        basicPay,
        medicalAllowance,
        travelAllowance,
        houseRentAllowance,
        conveyanceAllowance,
        specialAllowance,
        annualIncentive,
        advanceStatutoryBonus,
        salary,
      };
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      syncWithLocalStorage(updatedCategories);
      resetForm();
      alert('Successfully added class!');
    }
  };

  const handleEditCategory = (id) => {
    const categoryToEdit = categories.find((cat) => cat.id === id);
    if (categoryToEdit) {
      setClassName(categoryToEdit.className);
      setBasicPay(categoryToEdit.basicPay);
      setMedicalAllowance(categoryToEdit.medicalAllowance);
      setTravelAllowance(categoryToEdit.travelAllowance);
      setHouseRentAllowance(categoryToEdit.houseRentAllowance);
      setConveyanceAllowance(categoryToEdit.conveyanceAllowance);
      setSpecialAllowance(categoryToEdit.specialAllowance);
      setAnnualIncentive(categoryToEdit.annualIncentive);
      setAdvanceStatutoryBonus(categoryToEdit.advanceStatutoryBonus);
      setIsEditing(true);
      setEditCategoryId(id);
    }
  };

  
  const handleUpdateCategory = () => {
    if (isEditing && editCategoryId) {
      const updatedCategory = {
        id: editCategoryId,
        className,
        basicPay,
        medicalAllowance,
        travelAllowance,
        houseRentAllowance,
        conveyanceAllowance,
        specialAllowance,
        annualIncentive,
        advanceStatutoryBonus,
        salary,
      };
      const updatedCategories = categories.map((cat) =>
        cat.id === editCategoryId ? updatedCategory : cat
      );
      setCategories(updatedCategories);
      syncWithLocalStorage(updatedCategories);
      resetForm();
      alert('Successfully updated class!');
    }
  };

  
  const handleDeleteCategory = (id) => {
    const updatedCategories = categories.filter((cat) => cat.id !== id);
    setCategories(updatedCategories);
    syncWithLocalStorage(updatedCategories);
    alert('Successfully deleted class!');  
  };
  const handleBackScreen=()=>{
    navigate("/")
  }

  return (
    <div className="category-list-container">
      {islogin?<><h2>Employee Class Categories</h2>

<div className="category-form">
  <input
    type="text"
    value={className}
    onChange={(e) => setClassName(e.target.value)}
    placeholder="Class Name"
  />
  <input
    type="number"
    value={basicPay}
    onChange={(e) => setBasicPay(e.target.value)}
    placeholder="Basic Pay"
  />
  <input
    type="number"
    value={medicalAllowance}
    onChange={(e) => setMedicalAllowance(e.target.value)}
    placeholder="Medical Allowance"
  />
  <input
    type="number"
    value={travelAllowance}
    onChange={(e) => setTravelAllowance(e.target.value)}
    placeholder="Travel Allowance"
  />
  <input
    type="number"
    value={houseRentAllowance}
    onChange={(e) => setHouseRentAllowance(e.target.value)}
    placeholder="House Rent Allowance"
  />
  <input
    type="number"
    value={conveyanceAllowance}
    onChange={(e) => setConveyanceAllowance(e.target.value)}
    placeholder="Conveyance Allowance"
  />
  <input
    type="number"
    value={specialAllowance}
    onChange={(e) => setSpecialAllowance(e.target.value)}
    placeholder="Special Allowance"
  />
  <input
    type="number"
    value={annualIncentive}
    onChange={(e) => setAnnualIncentive(e.target.value)}
    placeholder="Annual Incentive"
  />
  <input
    type="number"
    value={advanceStatutoryBonus}
    onChange={(e) => setAdvanceStatutoryBonus(e.target.value)}
    placeholder="Advance Statutory Bonus"
  />
  <input
    type="number"
    value={salary}
    readOnly
    placeholder="Calculated Salary"
  />
  {isEditing ? (
    <button onClick={handleUpdateCategory}>Update Class</button>
  ) : (
    <button onClick={handleAddCategory}>Add Class</button>
  )}
  <button onClick={resetForm}>Cancel</button>
</div>


<table className="category-table">
  <thead>
    <tr>
      <th>ID</th>
      <th>Class Name</th>
      <th>Basic Pay</th>
      <th>Medical Allowance</th>
      <th>Travel Allowance</th>
      <th>House Rent Allowance</th>
      <th>Conveyance Allowance</th>
      <th>Special Allowance</th>
      <th>Annual Incentive</th>
      <th>Advance Statutory Bonus</th>
      <th>Salary</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {categories.map((category) => (
      <tr key={category.id}>
        <td>{category.id}</td>
        <td>{category.className}</td>
        <td>{category.basicPay}</td>
        <td>{category.medicalAllowance}</td>
        <td>{category.travelAllowance}</td>
        <td>{category.houseRentAllowance}</td>
        <td>{category.conveyanceAllowance}</td>
        <td>{category.specialAllowance}</td>
        <td>{category.annualIncentive}</td>
        <td>{category.advanceStatutoryBonus}</td>
        <td>{category.salary}</td>
        <td>
          <button onClick={() => handleEditCategory(category.id)}>Edit</button>
          <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table></>:
<>
<h1>Please Login Correctly</h1>
<button onClick={handleBackScreen}>Back</button>
</>
}
      
    </div>
  );
}

export default CategoryList;
