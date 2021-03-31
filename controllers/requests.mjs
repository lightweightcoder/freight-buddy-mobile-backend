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
        include: [
          {
            model: db.User,
            as: 'requester',
            attributes: ['name', 'photo'],
          },
        ],
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

  const updateStatus = async (req, res) => {
    console.log('request to update the status of a request ');

    // set object to store data to be sent to response
    const data = {};

    try {
      // get the user's id and country, and request's new status from the request body
      const { userId, userCountry, newStatus } = req.body;

      // request id
      const requestId = req.params.id;

      // update the request's new status
      await db.Request.update(
        {
          status: newStatus,
        },
        {
          where: {
            id: requestId,
          },
        },
      );

      // retrieve all requests of 'requested' status
      // find available requests in the user's country
      const requestsList = await db.Request.findAll({
        // only find requests with 'requested' status and to the user's country
        where: {
          status: 'requested',
          country: userCountry,
        },
        include: [
          { model: db.User, as: 'requester', attributes: ['name', 'photo'] },
        ],
        // order by latest request
        order: [
          ['createdAt', 'DESC'],
        ],
      });

      // retrieve all the user's requests
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

      // filter out the selected request from the user's requests
      // eslint-disable-next-line max-len
      const updatedSelectedRequest = userRequests.find((request) => request.id === Number(requestId));

      data.requestsList = requestsList;
      data.userRequests = userRequests;
      data.updatedSelectedRequest = updatedSelectedRequest;

      // send response with requests of 'requested' status, the user's requests and selected request
      res.send(data);
    } catch (error) {
      console.log(error);
      // send error to browser
      res.status(500).send(error);
    }
  };

  const create = async (req, res) => {
    console.log('request to create a delivery request');

    // set object to store data to be sent to response
    const data = {};

    try {
      // get the user's id and request details from the request body
      const { userId, requestDetails } = req.body;

      requestDetails.requesterId = userId;
      requestDetails.status = 'requested';

      await db.Request.create(requestDetails);

      // retrieve all the user's requests
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

      // send the user requests data to the response
      res.send(data);
    } catch (error) {
      console.log(error);
      // send error to browser
      res.status(500).send(error);
    }
  };

  return {
    index, updateStatus, create,
  };
}
