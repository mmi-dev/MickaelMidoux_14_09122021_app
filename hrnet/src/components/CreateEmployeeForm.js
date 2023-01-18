import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  InputLabel,
  Select,
  TextField,
  Box,
  MenuItem,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import statesList from "../data/statesList";
import departmentsList from "../data/departmentsList";
import baseEmployees from "../data/baseEmployees";

if (!localStorage.employees) {
  localStorage.employees = JSON.stringify(baseEmployees);
}

function CreateEmployeeForm() {
  const employees = JSON.parse(localStorage.getItem("employees"));
  const [birthDateValue, setBirthDateValue] = useState(null);
  const [startDateValue, setStartDateValue] = useState(null);
  const [selectedStateValue, setSelectedStateValue] = useState("");
  const [selectedDepartmentValue, setSelectedDepartmentValue] = useState("");

  const [record, setRecord] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    startDate: "",
    department: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    employees.push(record);
    localStorage.employees = JSON.stringify(employees);
    e.target.reset();
  }

  const handleStateChange = (e) => {
    setSelectedStateValue(e.target.value);
    setRecord((prev) => ({ ...prev, state: e.target.value }));
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartmentValue(e.target.value);
    setRecord((prev) => ({ ...prev, department: e.target.value }));
  };

  return (
    <>
      <h2>Create Employee</h2>

      <FormControl component="form" onSubmit={handleSubmit}>
        <TextField
          id="first-name"
          label="First Name"
          variant="standard"
          margin="normal"
          onChange={(e) =>
            setRecord((prev) => ({ ...prev, firstName: e.target.value }))
          }
        />
        <TextField
          id="lasst-name"
          label="Last Name"
          variant="standard"
          margin="normal"
          onChange={(e) =>
            setRecord((prev) => ({ ...prev, lastName: e.target.value }))
          }
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            id="date-of-birth"
            label="Date of Birth"
            inputFormat="DD/MM/YYYY"
            value={birthDateValue}
            maxDate={new Date()}
            onChange={(e) => {
              setBirthDateValue(e);
              setRecord((prev) => ({
                ...prev,
                dateOfBirth: new Date(e).toLocaleDateString(),
              }));
            }}
            renderInput={(params) => (
              <TextField {...params} variant="standard" helperText={null} />
            )}
          />
          <DatePicker
            id="start-date"
            label="Start Date"
            inputFormat="DD/MM/YYYY"
            value={startDateValue}
            maxDate={new Date()}
            onChange={(e) => {
              setStartDateValue(e);
              setRecord((prev) => ({
                ...prev,
                startDate: new Date(e).toLocaleDateString(),
              }));
            }}
            renderInput={(params) => (
              <TextField {...params} variant="standard" helperText={null} />
            )}
          />
        </LocalizationProvider>
        <Box component="fieldset" className="address">
          <FormLabel component="legend">Adress</FormLabel>
          <TextField
            id="street"
            label="Street"
            variant="standard"
            margin="normal"
            onChange={(e) =>
              setRecord((prev) => ({ ...prev, street: e.target.value }))
            }
          />
          <TextField
            id="city"
            label="City"
            variant="standard"
            margin="normal"
            onChange={(e) =>
              setRecord((prev) => ({ ...prev, city: e.target.value }))
            }
          />
          <FormControl>
            <InputLabel id="state-label">State</InputLabel>
            <Select
              labelId="state-label"
              id="state"
              label="State"
              variant="standard"
              value={selectedStateValue}
              onChange={handleStateChange}
            >
              {statesList.map((state, i) => (
                <MenuItem key={i} value={state.code}>
                  {state.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="zip-code"
            label="Zip Code"
            variant="standard"
            margin="normal"
            type="number"
            onChange={(e) =>
              setRecord((prev) => ({ ...prev, zipCode: e.target.value }))
            }
          />
        </Box>
        <FormControl>
          <InputLabel id="department-label">Department</InputLabel>
          <Select
            labelId="department-label"
            id="department"
            label="Department"
            variant="standard"
            value={selectedDepartmentValue}
            onChange={handleDepartmentChange}
          >
            {departmentsList.map((department, i) => (
              <MenuItem key={i} value={department}>
                {department}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" type="submit">
          Save
        </Button>
      </FormControl>
    </>
  );
}

export default CreateEmployeeForm;
