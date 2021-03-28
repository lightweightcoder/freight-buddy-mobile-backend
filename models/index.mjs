import { Sequelize } from 'sequelize';
import url from 'url';
import allConfig from '../config/config.js';

// import functions to initialise models
import initUserModel from './user.mjs';
import initRequestModel from './request.mjs';
import initProductPhotoModel from './productPhoto.mjs';

// if there is an environment variable called NODE_ENV (i.e. environment is in Heroku)
// if not, use 'development'
const env = process.env.NODE_ENV || 'development';

const config = allConfig[env];

const db = {};

let sequelize;

if (env === 'production') {
  // break apart the Heroku database url and rebuild the configs we need
  const { DATABASE_URL } = process.env;
  const dbUrl = url.parse(DATABASE_URL);
  const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(':'));
  const password = dbUrl.auth.substr(dbUrl.auth.indexOf(':') + 1, dbUrl.auth.length);
  const dbName = dbUrl.path.slice(1);

  const host = dbUrl.hostname;
  const { port } = dbUrl;

  config.host = host;
  config.port = port;

  sequelize = new Sequelize(dbName, username, password, config);
} else {
  // when app is in development mode
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// add model definitions and initialisations to db here
db.User = initUserModel(sequelize, Sequelize.DataTypes);
db.Request = initRequestModel(sequelize, Sequelize.DataTypes);
db.ProductPhoto = initProductPhotoModel(sequelize, Sequelize.DataTypes);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// create associations between models ======================================
// mentioning 'as' key below allows sequelize to create getter and setter mtds (eg. getRequester)
db.User.hasMany(db.Request, { as: 'requester', foreignKey: 'requesterId' });
// this below creates a requesterId column in the requests table if not already created in the model
db.Request.belongsTo(db.User, { as: 'requester' });

// mentioning this will allow sequelize to create getter and setter mtds (eg. getHelper)
db.User.hasMany(db.Request, { as: 'helper', foreignKey: 'helperId' });
// and create a helperId column in the requests table if not already created in the model
db.Request.belongsTo(db.User, { as: 'helper' });

db.Request.hasMany(db.ProductPhoto);
db.ProductPhoto.belongsTo(db.Request);

export default db;
