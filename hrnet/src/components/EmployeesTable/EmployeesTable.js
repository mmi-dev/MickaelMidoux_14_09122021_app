import { useContext } from "react";
import EmployeesContext from "../../contexts/EmployeesProvider";
import DataTable from "../datatables/DataTable";
import "./EmployeesTable.css";

function EmployeesTable() {
  const { employees } = useContext(EmployeesContext);

  const columnsData = [
    { title: "First Name", flex: 1, minwidth: 100 },
    { title: "Last Name", flex: 1, minwidth: 100 },
    { title: "Start Date", flex: 0.7, minwidth: 100 },
    { title: "Department", flex: 1, minwidth: 100 },
    { title: "Date of Birth", flex: 0.7, minwidth: 100 },
    { title: "Street", flex: 2.5, minwidth: 200 },
    { title: "City", flex: 1, minwidth: 120 },
    { title: "State", flex: 0.3, minwidth: 50 },
    { title: "Zip Code", flex: 0.5, minwidth: 80 },
  ];

  const columns = columnsData.map((columnData, i) => {
    return {
      field: `col${i}`,
      headerName: columnData.title,
      flex: columnData.flex,
      minWidth: columnData.minwidth,
    };
  });
  const rows =
    employees.length > 0
      ? employees.map((employee, i) => {
          return {
            id: i,
            col0: employee.firstName,
            col1: employee.lastName,
            col2: employee.startDate,
            col3: employee.department,
            col4: employee.dateOfBirth,
            col5: employee.street,
            col6: employee.city,
            col7: employee.state,
            col8: employee.zipCode,
          };
        })
      : null;

  return (
    <>
      <div id="employees-table">
        {employees.length > 0 ? (
          <DataTable columns={columns} rows={rows} qSearch></DataTable>
        ) : (
          <div>no data</div> //replace by modal message
        )}
      </div>
    </>
  );
}

export default EmployeesTable;
