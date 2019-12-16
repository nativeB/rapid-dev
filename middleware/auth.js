//express middlewares here

//example
const auth = async (req, res, next) => {
  try {
    //do something
    next();
  } catch (error) {
    //send error response
    // res.status(401).send({ error: '' });
  }
};

module.exports = {
  auth,
};
