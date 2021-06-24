'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Songs', [
      {
        title: '???',
        songUrl: '????????????????',
        userId: 1,
        albumId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: '!!!',
        songUrl: '!!!!!!!!!!!!!!!',
        userId: 3,
        albumId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: '///',
        songUrl: '/////////////////',
        userId: 2,
        albumId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Songs', null, {});
  }
};
