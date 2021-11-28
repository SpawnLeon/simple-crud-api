import * as crypto from 'crypto';

export default class Person {
  constructor({
    id = crypto.randomUUID(),
    name = 'PERSON',
    age = 0,
    hobbies = [],
  } = {}) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.hobbies = hobbies;
  }
}
