// import the seed data
const seedData = require('../utilities/seed-data');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // destructure the seed data
    const {
      usersList, requestsList,
    } = seedData;

    try {
      await queryInterface.bulkInsert('users', usersList);
      await queryInterface.bulkInsert('requests', requestsList);
    } catch (error) {
      console.log(error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    // delete the seed data
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('requests', null, {});
  },
};
