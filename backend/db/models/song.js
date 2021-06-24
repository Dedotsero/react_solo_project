'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    songUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    albumId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Song.associate = function(models) {
    Song.belongsTo(models.Album, { foreignKey: 'albumId' })
    Song.belongsTo(models.User, { foreignKey: 'userId' })
    Song.hasMany(models.Comment, { foreignKey: 'songId' })
  };
  return Song;
};
