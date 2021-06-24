'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Albums', [
        {
          title: 'Back And Forth Forever',
          imageUrl:
            'https://direct.rhapsody.com/imageserver/images/alb.315169707/500x500.jpg',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Pinball Museum',
          imageUrl: 'https://f4.bcbits.com/img/a3994612061_10.jpg',
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Between the Hallelujahs',
          imageUrl:
            'https://i.scdn.co/image/ab67616d0000b2737b21398bc5e7be0beedf8421',
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Albums', null, {});
  }
};
