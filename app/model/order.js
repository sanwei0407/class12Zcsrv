/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('order', {
    oid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    carId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    startDate: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    endDate: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    fee: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    yj: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    linkMan: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    linkPhone: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'order'
  });

  Model.associate = function() {

  }

  return Model;
};
