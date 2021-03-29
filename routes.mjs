import db from './models/index.mjs';

// import controllers here
import initUsersController from './controllers/users.mjs';
import initRequestsController from './controllers/requests.mjs';

export default function bindRoutes(app) {
  // initialize the controller functions here
  // pass in the db for all callbacks
  const UsersController = initUsersController(db);
  const RequestsController = initRequestsController(db);

  // define route matchers here using app ======
  // accept login form request
  app.post('/login', UsersController.login);

  // accept a request to login to a demo user
  app.get('/demo-login', UsersController.demoLogin);

  // get a list of available requests to the user's country
  app.get('/requests', RequestsController.index);
}
