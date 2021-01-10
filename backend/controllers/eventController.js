
const mongoose = require('mongoose');
const _ = require('lodash');

const Event = mongoose.model('Event');

module.exports.getEvents = (req, res, next) => {
  Event.find().then(documents => {
    res.status(200).send(documents);
  });
}
