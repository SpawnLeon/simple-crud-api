import Person from './person.model.js';

const PERSON = [];

export const getUsers = () => PERSON;

export const getUser = (personId) => {
  const idx = PERSON.findIndex((person) => person.id === personId);
  if (idx !== -1) {
    return PERSON[idx];
  }
  return null;
};

export const createPerson = (person) => {
  const personModel = new Person({ ...person });
  PERSON.push(personModel);
  return personModel;
};

export const updatePerson = (personId, person) => {
  const idx = PERSON.findIndex((p) => p.id === personId);
  if (idx !== -1) {
    PERSON[idx] = { ...PERSON[idx], ...person };
    return PERSON[idx];
  }
  return null;
};

export const deletePerson = (personId) => {
  const idx = PERSON.findIndex((p) => p.id === personId);
  if (idx !== -1) {
    const person = PERSON[idx];
    PERSON.splice(idx, 1);
    return person;
  }
  return null;
};
