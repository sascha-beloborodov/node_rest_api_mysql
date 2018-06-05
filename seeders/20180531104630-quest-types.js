'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
        return queryInterface.bulkInsert('QuestTypes', [
            {
                name: 'Horror',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Adventure',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Movies',
                createdAt: new Date(),
                updatedAt: new Date()
            }], {});
    },

    down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
        return queryInterface.bulkDelete('QuestTypes', null, {});
    }
};