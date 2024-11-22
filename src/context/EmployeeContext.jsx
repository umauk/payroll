import React, { createContext, useState, useContext, useEffect } from 'react';

export const EmployeeContext = createContext();

export const useEmployeeContext = () => {
  return useContext(EmployeeContext);
};

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const[islogin,setIsLogin]=useState(false)

 
  useEffect(() => {
    const storedEmployees = localStorage.getItem('employees');
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    }
  }, []);

  
  const syncWithLocalStorage = (updatedEmployees) => {
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };

 
  const addEmployee = (employee) => {
    setEmployees((prevEmployees) => {
      const updatedEmployees = [...prevEmployees, employee];
      syncWithLocalStorage(updatedEmployees); 
      return updatedEmployees;
    });
  };

 
  const deleteEmployee = (id) => {
    setEmployees((prevEmployees) => {
      const updatedEmployees = prevEmployees.filter((emp) => emp.id !== id);
      syncWithLocalStorage(updatedEmployees); 
      return updatedEmployees;
    });
  };

  
  const updateEmployee = (updatedEmployee) => {
    setEmployees((prevEmployees) => {
      const updatedEmployees = prevEmployees.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      );
      syncWithLocalStorage(updatedEmployees); 
      return updatedEmployees;
    });
  };

  return (
    <EmployeeContext.Provider
      value={{ employees, addEmployee, deleteEmployee, updateEmployee, islogin,setIsLogin}}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
