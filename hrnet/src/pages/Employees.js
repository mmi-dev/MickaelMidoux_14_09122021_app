function Employees() {
  const employees = JSON.parse(localStorage.getItem("employees"));

  console.log(employees);

  employees.map((employee) => {
    console.log(Object.values(employee));
    Object.values(employee).map((value) => {
      console.log(value);
      return value;
    });
    return employee;
  });

  return (
    <>
      <h1>Current Employees</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Start Date</th>
            <th>Department</th>
            <th>Date of Birth</th>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, i) => (
            <tr key={i}>
              {Object.values(employee).map((value, i) => (
                <td key={i}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Employees;
