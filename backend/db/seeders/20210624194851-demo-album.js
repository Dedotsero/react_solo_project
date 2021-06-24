'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Albums', [
      {
        title: '???',
        imageURL: '??????????????',
        userId: '4'
      },
      {
        title: '!!!',
        imageURL: '!!!!!!!!!!!!!!',
        userId: '3'
      },
      {
        title: '///',
        imageURL: '//////////////',
        userId: '2'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
