const mongoose = require('mongoose');
const _ = require('lodash');

const User = mongoose.model('User');
const Book = mongoose.model('Book');
const RegistrationRequest = mongoose.model('RegistrationRequest');


module.exports.login = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ username: username }, function (err, user) {
    if (err || user === null) {
      res.status(400).json({
        message: "Incorrect username "
      });;
    } else {
      if (password == user.password) {
        res.status(200).json({ userType: user.userType });
      }
      else {
        res.status(400).json({
          message: "Incorrect password "
        });
      }
    }
  });
}

module.exports.registration = (req, res, next) => {
  console.log("_________________________");
  console.log(req.body);
  var user = new User();
  user.username = req.body.username;
  user.password = req.body.password;
  user.userType = 'regUser';
  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname;
  user.date = req.body.date;
  user.email = req.body.email;
  user.place = req.body.place;
  user.imagePath = req.body.imagePath;
  user.nizKojeTrenutnoCita =[];
  user.nizProcitanih=[];


  user.save((err, doc) => {
    if (!err) {
      RegistrationRequest.deleteOne({ _id: req.body._id }).then(result => {
        res.status(200).json({ message: "Successfully registrated user!" });
      })
        .catch(err => {
          console.log("error u register");
          res.status(400).json({ message: err });
        });
    }
    else {
      console.log(err);
    }
  });
}


module.exports.getUsers = (req, res, next) => {
  User.find().then(documents => {
    res.status(200).send(documents);
  });
}


module.exports.deleteUser = (req, res, next) => {
  User.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: "User deleted!" });
  })
    .catch(err => {
      console.log("error u deleteUser");
      res.status(400).json({ message: err });
    });
}

module.exports.getUserInfo = (req, res, next) => {
  User.findOne({ username: req.params.username }).then(result => {
    res.status(200).send(result);
  })
    .catch(err => {
      console.log("error u getUserInfo");
      res.status(400).json({ message: err });
    });
}


module.exports.updateUser = (req, res, next) => {
  console.log(req.body);
  User.updateOne({ username: req.body.username }, { userType: req.body.userType }).then(documents => {
    res.status(200).json({
      message: 'Successfully apdated user!'
    });
  });
}



module.exports.updateProfile = (req, res, next) => {
  console.log(req.body);
  var user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    date: req.body.date,
    email: req.body.email,
    place: req.body.place
  }
  // user.imagePath= url + "/images/" + req.file.filename;
  User.updateOne({ username: req.body.username }, user).then(documents => {
    res.status(200).json({
      message: 'Successfully apdated user!'
    });
  });
}


module.exports.changePassword = (req, res, next) => {
  var newPassword = req.body.password;
  var oldPassword = req.body.oldPassword;
  User.findOne({ username: req.body.username }).then(user => {
    if (user.password === oldPassword) {
      User.updateOne({ username: req.body.username }, { password: newPassword }).then(doc => {
        res.status(200).json({
          message: 'Successfully apdated user!'
        });
      });
    } else {
      res.status(400).json({
        message: 'Old password is not correct!'
      });
    }
  })
}


module.exports.addReadBook = (req, res, next) => {
  var username = req.body.user;
  var title = req.body.book;
  console.log(req.body);
  User.findOne({ username: username }).then(user => {
    let found = false;
    user.nizProcitanih.forEach(element => {
      if(element === bookId){found=true;}
    });
    if (found == false) {
      !user.nizProcitanih.push(title);
      console.log(user);
    User.updateOne({ username: username }, user).then(documents => {
      res.status(200).json({
        message: 'Successfully apdated user!'
      });
    }).catch(err => {
      console.log(err);
      res.status(400).json({
        message: err
      });
        })
  }
  }).catch(err => {
    console.log(err);
    res.status(400).json({
      message: err
    });})
}


module.exports.addReadingBook = (req, res, next) => {
  var username = req.body.user;
  var bookId = req.body.book;
  User.findOne({ username: username }).then(user => {
    let found = false;
    user.nizKojeTrenutnoCita.forEach(element => {
      if(element.book === bookId){found=true;}
    });
    if (found == false) {

      !user.nizKojeTrenutnoCita.push({book:bookId, pages: req.body.pages, readPages: req.body.pagesRead});

      User.updateOne({ username: username }, user).then(documents => {
        res.status(200).json({
          message: 'Successfully apdated user!'
        });
      }).catch(err => {
        console.log(err);
        res.status(400).json({
          message: err
        });})}
  }).catch(err => {
    console.log(err);
    res.status(400).json({
      message: err
    });});
}
