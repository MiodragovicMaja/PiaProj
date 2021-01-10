const mongoose = require('mongoose');
const _ = require('lodash');
var request = require('request');


const RegistrationRequest = mongoose.model('RegistrationRequest');
const User = mongoose.model('User');

module.exports.getRegistrationRequests = (req, res, next) => {
  RegistrationRequest.find().then(documents => {
      res.status(200).send(documents);
  });
}

module.exports.registrationRequest = (req, res, next) => {
  console.log(req.body);
  const url = req.protocol + "://" + req.get("host");
  var user = new RegistrationRequest();
  user.username = req.body.username;
  user.password = req.body.password;
  user.userType = 'regUser';
  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname;
  user.date = req.body.date;
  user.email = req.body.email;
  user.place = req.body.place;
  user.imagePath= url + "/images/" + req.file.filename;

  user.save((err, doc) => {
    if (!err) {
      res.status(200).json({ message: "Successfuly sent registration request!" });
    }
    else{
      console.log(err);
    }
  });
}

module.exports.deleteRegistrationRequests = (req, res, next) => {
  RegistrationRequest.deleteOne({ _id: req.params.id }).then(result => {
      res.status(200).json({ message: "Request rejected" });
  })
      .catch(err => {
          console.log("error u deleteRegistrationRequests");
          res.status(400).json({ message: err });
      });
}
