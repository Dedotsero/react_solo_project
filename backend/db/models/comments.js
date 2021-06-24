'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    songId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.Song, { foreignKey: 'songId' })
    Comment.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return Comment;
};
