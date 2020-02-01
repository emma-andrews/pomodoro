const axios = require('request');

const csServer = 'http://10.136.68.140:5001';

exports.blah = (req, res) => {
  res.json(req);
};

exports.registerUser = async (req, res) => {
  let externalResponse = null;
  try {
    externalResponse = await axios.post(`${csServer}/users`, req.body);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
  if (externalResponse) res.json(externalResponse.body);
};
