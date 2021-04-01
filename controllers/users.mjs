import getHash from '../utilities/get-hash.mjs';

export default function initUsersController(db) {
  const login = async (req, res) => {
    console.log('post request to login came in');

    // set object to store messages for invalid email or password input fields
    const templateData = {};

    try {
      const emailInput = req.body.email;
      const passwordInput = req.body.password;
      const hashedPasswordInput = getHash(passwordInput);

      // try to find a user
      const user = await db.User.findOne(
        {
          where: { email: emailInput, password: hashedPasswordInput },
        },
      );

      // check if a user is found
      if (user === null) {
        console.log('user not found');

        // add message to inform user of invalid email/password
        templateData.invalidMessage = 'Sorry you have keyed in an incorrect email/password';

        // render the login form
        res.send(templateData);
      } else {
        console.log('found user, logged in!');

        // generate a hashed userId
        const loggedInHash = getHash(user.id);

        // send a success response and authentication details
        res.send({
          userId: user.id,
          loggedInHash,
          userCountry: user.country,
        });
      }
    } catch (error) {
      console.log(error);
      // send error to browser
      res.status(500).send(error);
    }
  };

  const demoLogin = async (req, res) => {
    console.log('get request to login to demo user came in');

    try {
      const hashedPasswordInput = getHash('demo-user1');

      // try to find the demo user from the database
      const user = await db.User.findOne(
        {
          where: { email: 'demo1@gmail.com', password: hashedPasswordInput },
        },
      );

      // check if demo user is found
      if (user === null) {
        // if demo user is not found
        console.log('demo user not found');

        // send response that login failed
        res.send({ loginSuccess: false });
      } else {
        console.log('found user, logged in!');

        // generate a hashed userId
        const loggedInHash = getHash(user.id);

        // send a success response and authentication details
        res.send({
          userId: user.id,
          loggedInHash,
          userCountry: user.country,
        });
      }
    } catch (error) {
      console.log(error);
      // send error to browser
      res.status(500).send(error);
    }
  };

  const requests = async (req, res) => {
    console.log('get request for user requests came in');

    // get the user id from the url paramaters
    const { userId } = req.params;

    // set object to store data to be sent to response
    const data = {};

    try {
      // find all requests belonging to that user
      const userRequests = await db.Request.findAll({
        where: {
          requesterId: userId,
        },
        include: [
          { model: db.User, as: 'requester', attributes: ['name', 'photo'] },
        ],
        order: [
          ['createdAt', 'DESC'],
        ],
      });

      data.userRequests = userRequests;

      // send the user requests to the response
      res.send(data);
    } catch (error) {
      console.log(error);
      // send error to browser
      res.status(500).send(error);
    }
  };

  const show = async (req, res) => {
    console.log('get request for user profile came in');

    // get the user id from the url paramaters
    const { userId } = req.params;

    // set object to store data to be sent to response
    const data = {};

    try {
      // find all requests belonging to that user
      const userProfile = await db.User.findOne({
        where: {
          id: userId,
        },
        attributes: ['name', 'email', 'address', 'country'],
      });

      data.userProfile = userProfile;

      // send the user requests to the response
      res.send(data);
    } catch (error) {
      console.log(error);
      // send error to browser
      res.status(500).send(error);
    }
  };

  return {
    login, demoLogin, requests, show,
  };
}
