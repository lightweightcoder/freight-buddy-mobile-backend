import db from './models/index.mjs';
// import controllers here

export default function bindRoutes(app) {
  // initialize the controller functions here
  // pass in the db for all callbacks

  // define route matchers here using app
  app.get('/home', (request, response) => {
    console.log('request came in');
    response.send({ test: 'test' });
  });
}
