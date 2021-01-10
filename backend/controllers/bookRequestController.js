const mongoose = require('mongoose');
const _ = require('lodash');
var request = require('request');


const BookRequest = mongoose.model('BookRequest');
const Book = mongoose.model('Book');

module.exports.getBookRequests = (req, res, next) => {
  BookRequest.find().then(documents => {
      res.status(200).send(documents);
  });
}

module.exports.addBookRequest = (req, res, next) => {
  console.log(req.body);
  var book = new BookRequest();
  book.title = req.body.title;
  book.authors[0] = req.body.authors;
  book.genres[0] = req.body.genres;
  book.date = req.body.date;
  book.description = req.body.description;
  book.save((err, doc) => {
    if (!err) {
      res.status(200).json({ message: "Successfuly sent book request!" });
    }
    else{
      console.log(err);
    }
  });
}

module.exports.deleteBookRequests = (req, res, next) => {
  BookRequest.deleteOne({ _id: req.params.id }).then(result => {
      res.status(200).json({ message: "Request rejected" });
  })
      .catch(err => {
          console.log("error u deleteRegistrationRequests");
          res.status(400).json({ message: err });
      });
}
