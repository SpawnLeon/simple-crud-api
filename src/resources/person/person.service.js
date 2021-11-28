import * as repoPerson from './person.memory.repository.js';

export const getUsers = () => repoPerson.getUsers();

export const getUser = (personId) => repoPerson.getUser(personId);

export const createPerson = (person) => repoPerson.createPerson(person);

export const updatePerson = (personId, person) => repoPerson.updatePerson(personId, person);

export const deletePerson = (personId) => repoPerson.deletePerson(personId, personId);
