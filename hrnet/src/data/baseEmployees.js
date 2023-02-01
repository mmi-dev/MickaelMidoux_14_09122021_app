import fakeUser from "./tmp/fakeUser.json";
import statesList from "./statesList";
import departmentsList from "./departmentsList";

/**
 * fake user list
 * @returns {[object]} fake user list
 */
const fakeUserList = fakeUser.results.map((user) => user);

/**
 * fake employees list
 * @returns {[object]} emplyees list
 */
const createBaseEmployeesList = fakeUserList.map((user) => ({
  firstName: user.name.first,
  lastName: user.name.last,
  dateOfBirth: new Date(user.dob.date).toLocaleDateString(),
  startDate: new Date(user.registered.date).toLocaleDateString(),
  department: departmentsList[(Math.random() * departmentsList.length) | 0],
  street: `${user.location.street.number} ${user.location.street.name}`,
  city: user.location.city,
  state: statesList.find((state) => state.name === user.location.state).code,
  zipCode: user.location.postcode,
}));

/**
 * @param {integer} nb number of employees to insert in the storage for dev (max 100)
 * @returns {[object]} emplyees list
 */
const baseEmployees = (nb) => createBaseEmployeesList.slice(0, nb);

export default baseEmployees;
