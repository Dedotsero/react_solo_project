'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    title:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Album.associate = function(models) {
    Album.belongsTo(models.User, { foreignKey: 'userId' })
    Album.hasMany(models.Song, { foreignKey: 'albumId' })
  };
  return Album;
};
