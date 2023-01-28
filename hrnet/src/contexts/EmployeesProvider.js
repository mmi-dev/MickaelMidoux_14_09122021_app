import { createContext, useEffect, useState } from "react";
import baseEmployees from "../data/baseEmployees";

const EmployeesContext = createContext({});
const baseEmployeesNb = 99; // nb of records for dev

export const EmployeesProvider = ({ children }) => {
  const [employees, setEmployees] = useState({});

  useEffect(() => {
    if (localStorage.employees) {
      setEmployees(JSON.parse(localStorage.employees));
    } else {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        setEmployees(baseEmployees(baseEmployeesNb));
      } else {
        setEmployees(baseEmployees(0));
      }
    }
  }, []);

  useEffect(() => {
    if (employees.length > 0) {
      localStorage.employees = JSON.stringify(employees);
    }
  }, [employees]);

  return (
    <EmployeesContext.Provider value={{ employees, setEmployees }}>
      {children}
    </EmployeesContext.Provider>
  );
};

export default EmployeesContext;
