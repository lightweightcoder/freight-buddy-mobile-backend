export default function initRequestModel(sequelize, DataTypes) {
  return sequelize.define('request', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    category: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    helperId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    requesterId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    productName: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    referenceLink: {
      type: DataTypes.STRING,
    },
    paymentFilename: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM('requested', 'accepted', 'shipped', 'completed', 'cancelled'),
    },
    shippingAddress: {
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
