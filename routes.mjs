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

  app.post('/home', (request, response) => {
    console.log('post request to home came in');
    console.log(request.body, 'request.body');

    response.send({ test: 'post to home route test success' });
  });
}
