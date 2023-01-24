import { useState, useEffect, useRef } from "react";
import "./CreateEmployeeForm.css";
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
import { LocationOnRounded, PersonAddRounded } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import statesList from "../../data/statesList";
import departmentsList from "../../data/departmentsList";
import baseEmployees from "../../data/baseEmployees";

const baseEmployeesNb = 48;

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  localStorage.employees = JSON.stringify(baseEmployees(baseEmployeesNb));
} else {
  localStorage.employees = JSON.stringify(baseEmployees(0));
}

function CreateEmployeeForm() {
  const employees = JSON.parse(localStorage.getItem("employees"));
  const [birthDateValue, setBirthDateValue] = useState(null);
  const [startDateValue, setStartDateValue] = useState(null);
  const [selectedStateValue, setSelectedStateValue] = useState("");
  const [selectedDepartmentValue, setSelectedDepartmentValue] = useState("");

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
    inputRef.current.focus();
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
      <div className="employee-form-container">
        <h2>Create Employee</h2>

        <FormControl component="form" onSubmit={handleSubmit}>
          <TextField
            id="first-name"
            label="First Name"
            variant="standard"
            inputRef={inputRef}
            className="employee-input"
            onChange={(e) =>
              setRecord((prev) => ({ ...prev, firstName: e.target.value }))
            }
          />
          <TextField
            id="lasst-name"
            label="Last Name"
            variant="standard"
            className="employee-input"
            onChange={(e) =>
              setRecord((prev) => ({ ...prev, lastName: e.target.value }))
            }
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              id="date-of-birth"
              label="Date of Birth"
              inputFormat="DD/MM/YYYY"
              className="employee-input"
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
              className="employee-input"
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
            <FormLabel component="legend">
              <LocationOnRounded />
              <span>Address</span>
            </FormLabel>
            <TextField
              id="street"
              label="Street"
              variant="standard"
              className="employee-input"
              onChange={(e) =>
                setRecord((prev) => ({ ...prev, street: e.target.value }))
              }
            />
            <TextField
              id="city"
              label="City"
              variant="standard"
              className="employee-input"
              onChange={(e) =>
                setRecord((prev) => ({ ...prev, city: e.target.value }))
              }
            />
            <FormControl variant="standard">
              <InputLabel id="state-label">State</InputLabel>
              <Select
                labelId="state-label"
                id="state"
                label="State"
                variant="standard"
                className="employee-input"
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
              className="employee-input"
              type="number"
              onChange={(e) =>
                setRecord((prev) => ({ ...prev, zipCode: e.target.value }))
              }
            />
          </Box>
          <FormControl variant="standard">
            <InputLabel id="department-label">Department</InputLabel>
            <Select
              labelId="department-label"
              id="department"
              label="Department"
              variant="standard"
              className="employee-input"
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
          <Button
            variant="contained"
            className="employee-btn"
            type="submit"
            margin="normal"
            startIcon={<PersonAddRounded />}
          >
            Save
          </Button>
        </FormControl>
      </div>
    </>
  );
}

export default CreateEmployeeForm;
