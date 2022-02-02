class OOUser {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

const jane = new OOUser('Jane', 'Doe');
jane.fullName(); // "Jane Doe"

// fuck classes
const user = { firstName: 'Jane', lastName: 'Doe' };
const joinWithSpace = (...args) => args.join(' ');

joinWithSpace(user.firstName, user.lastName);

joinWithSpace('a', 'b', 'c');
joinWithSpace(joinWithSpace('a', 'b'), 'c');
joinWithSpace('a', joinWithSpace('b', 'c'));

// require('./semigroups');
// require('./semigroups-exercises');
// require('./validation');
// require('./function-modeling');
require('./lenses');
