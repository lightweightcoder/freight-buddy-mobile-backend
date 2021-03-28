export default function initProductPhotoModel(sequelize, DataTypes) {
  return sequelize.define('productPhoto', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    requestId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'requests',
        key: 'id',
      },
    },
    filename: {
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, { underscored: true });
}
