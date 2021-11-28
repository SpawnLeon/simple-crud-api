import * as crypto from 'crypto';

export default class User {
  constructor({
    id = crypto.randomUUID(),
    name = 'USER',
    age = 0,
    hobbies = [],
  } = {}) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.hobbies = hobbies;
  }
}
