export default function initRequestsController(db) {
  const index = async (req, res) => {
    console.log('request to render list of requests');

    // set object to store data to be sent to response
    const data = {};

    // array of available requests
    let requestsList = [];

    try {
      // find available requests in the user's country
      requestsList = await db.Request.findAll({
        // only find requests with 'requested' status and to the user's country
        where: {
          status: 'requested',
          country: req.query.country,
        },
        // order by latest request
        order: [
          ['createdAt', 'DESC'],
        ],
      });

      data.requestsList = requestsList;

      // send the data to the response
      res.send(data);
    } catch (error) {
      console.log(error);
      // send error to browser
      res.status(500).send(error);
    }
  };

  return {
    index,
  };
}
