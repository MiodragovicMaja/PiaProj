const mongoose = require('mongoose');
const _ = require('lodash');

const Book = mongoose.model('Book');
const BookRequest = mongoose.model('BookRequest');


module.exports.addBook = (req, res, next) => {
  var book = new Book();
  console.log(req.body)
  book.title = req.body.title;

  book.date = req.body.date;
  book.description = req.body.description;

  book.genres= [];
  book.genres.push( req.body.genres);
  book.authors=[];
  book.authors.push(req.body.authors);
  book.nizKomentara= [];
  book.save((err, doc) => {
    if(!err){
      BookRequest.deleteOne({_id:req.body._id}).then(doc=>{
        res.status(200).send(doc);
      }).catch(err=>{
        console.log(err);
      });

    }else{
      console.log(err);
    }
  });
};

module.exports.getBooks = (req, res, next) => {
  console.log(req.body);
  Book.find().then(documents => {
    res.status(200).send(documents);
  });
}


module.exports.comment=(req, res, next)=>{
  var user = req.body.username;
  var bookId = req.body.bookId;
  var tekst= req.body.tekst;
  Book.findOne({ _id: bookId }).then(book => {
    book.nizKomentara.push({tekst:tekst, username:user});

    Book.updateOne({ _id: bookId }, book).then(documents => {
      res.status(200).json({
        message: 'Successfully apdated user!'
      });
    })
  });
}

module.exports.getBook = (req, res, next)=>{
  var bookId = req.params.id;
  console.log(bookId)
  Book.findOne({ _id: bookId }).then(book => {
    console.log(book);

    res.status(200).send(book);

    })
}



