import { useState } from "react";

const baseEmployees = [
  {
    firstName: "mickael",
    lastName: "midoux",
    dateOfBirth: "01/09/1973",
    startDate: "01/05/2013",
    department: "Legal",
    street: "rte de la chapelle",
    city: "rocroi",
    state: "AL",
    zipCode: "08230",
  },
  {
    firstName: "julie",
    lastName: "midoux",
    dateOfBirth: "01/12/1975",
    startDate: "12/05/2015",
    department: "Legal",
    street: "1298 rte de petite chapelle",
    city: "rocroi (france)",
    state: "AL",
    zipCode: "08230",
  },
];

if (!localStorage.employees) {
  localStorage.employees = JSON.stringify(baseEmployees);
}

function CreateEmployeeForm() {
  const employees = JSON.parse(localStorage.getItem("employees"));
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

  return (
    <>
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit} id="create-employee">
        <label htmlFor="first-name">First Name</label>
        <input
          type="text"
          id="first-name"
          onChange={(e) =>
            setRecord((prev) => ({ ...prev, firstName: e.target.value }))
          }
        />

        <label htmlFor="last-name">Last Name</label>
        <input
          type="text"
          id="last-name"
          onChange={(e) =>
            setRecord((prev) => ({ ...prev, lastName: e.target.value }))
          }
        />

        <label htmlFor="date-of-birth">Date of Birth</label>
        <input
          id="date-of-birth"
          type="date"
          onChange={(e) =>
            setRecord((prev) => ({
              ...prev,
              dateOfBirth: new Date(e.target.value).toLocaleDateString(),
            }))
          }
        />

        <label htmlFor="start-date">Start Date</label>
        <input
          id="start-date"
          type="date"
          onChange={(e) =>
            setRecord((prev) => ({
              ...prev,
              startDate: new Date(e.target.value).toLocaleDateString(),
            }))
          }
        />

        <fieldset className="address">
          <legend>Address</legend>

          <label htmlFor="street">Street</label>
          <input
            id="street"
            type="text"
            onChange={(e) =>
              setRecord((prev) => ({ ...prev, street: e.target.value }))
            }
          />

          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            onChange={(e) =>
              setRecord((prev) => ({ ...prev, city: e.target.value }))
            }
          />

          <label htmlFor="state-button">State</label>
          <select
            name="state"
            id="state"
            onChange={(e) =>
              setRecord((prev) => ({ ...prev, state: e.target.value }))
            }
          >
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AS">American Samoa</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FM">Federated States Of Micronesia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="GU">Guam</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MH">Marshall Islands</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="MP">Northern Mariana Islands</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PW">Palau</option>
            <option value="PA">Pennsylvania</option>
            <option value="PR">Puerto Rico</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VI">Virgin Islands</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>

          <label htmlFor="zip-code">Zip Code</label>
          <input
            id="zip-code"
            type="number"
            onChange={(e) =>
              setRecord((prev) => ({ ...prev, zipCode: e.target.value }))
            }
          />
        </fieldset>

        <label htmlFor="department-button">Department</label>
        <select
          name="department"
          id="department"
          onChange={(e) =>
            setRecord((prev) => ({ ...prev, department: e.target.value }))
          }
        >
          <option>Sales</option>
          <option>Marketing</option>
          <option>Engineering</option>
          <option>Human Resources</option>
          <option>Legal</option>
        </select>
        <button>Save</button>
      </form>
    </>
  );
}

export default CreateEmployeeForm;
