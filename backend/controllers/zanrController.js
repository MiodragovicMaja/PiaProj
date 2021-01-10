const mongoose = require('mongoose');
const _ = require('lodash');

const Zanr = mongoose.model('Zanr');



module.exports.getZanrs = (req, res, next) => {
  Zanr.find().then(documents => {
    res.status(200).send(documents);
  });
}


module.exports.addZanr = (req, res, next) => {
  var zanr = new Zanr();
  zanr.name = req.body.name;
  zanr.save().then(documents => {
    res.status(200).send(documents);
  }).catch(err => {
    console.log(err);
  });
}

module.exports.addZanr = (req, res, next) => {
  var zanr = new Zanr();
  console.log(req.body)
  zanr.name = req.body.name;

  zanr.save((err, doc) => {
    if(!err){


    }else{
      console.log(err);
    }
  });
};
