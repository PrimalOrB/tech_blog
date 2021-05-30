const { User } = require('../models');

const userData = [
  {
    "username":"test",
    "email":"test@test.com",
    "password":"123245"
  },
  {
    "username":"test2",
    "email":"test2@test2.com",
    "password":"123245"
  },
  {
    "username":"test3",
    "email":"test3@test3.com",
    "password":"123245"
  },
  {
    "username":"test4",
    "email":"test4@test4.com",
    "password":"123245"
  },
];

const seedUser = () => User.bulkCreate( userData );

module.exports = seedUser;
