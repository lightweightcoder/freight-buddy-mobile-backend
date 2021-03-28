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

        // add userId and hashed userId to response
        templateData.userId = user.id;
        templateData.loggedInHash = loggedInHash;

        // redirect to home page
        res.send(templateData);
      }
    } catch (error) {
      console.log(error);
      // send error to browser
      res.status(500).send(error);
    }
  };

  return {
    login,
  };
}
