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
        return queryInterface.bulkInsert('ComfortTypes', [
            {
                name: 'Car parking',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Bike parking',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Free snacks',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Bar',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'WiFi',
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
        return queryInterface.bulkDelete('ComfortTypes', null, {});
    }
};
