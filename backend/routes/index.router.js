const express = require('express');
const router = express.Router();
const multer= require('multer');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type (user.js)");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now().toLocaleString() + "." + ext);
  }
})


const ctrlEvent = require('../controllers/eventController');
const ctrlBook = require('../controllers/bookController');
const ctrlZanr = require('../controllers/zanrController');
const ctrlUser = require('../controllers/userController');
const ctrlRegisterRequest = require('../controllers/registrationRequestController');
const ctrlBookRequest = require('../controllers/bookRequestController');


router.post('/login', ctrlUser.login);
router.post('/registration_request', multer({ storage: storage }).single("image"), ctrlRegisterRequest.registrationRequest);

// for admin registration request managment
router.get('/registration_request', ctrlRegisterRequest.getRegistrationRequests);
router.delete('/registration_request/:id', ctrlRegisterRequest.deleteRegistrationRequests);




// for admin book request managment
router.get('/bookRequest', ctrlBookRequest.getBookRequests);
router.post('/bookRequest', ctrlBookRequest.addBookRequest);
router.delete('/bookRequest/:id', ctrlBookRequest.deleteBookRequests);

// user menagment
router.get('/users', ctrlUser.getUsers);
router.delete('/users/:id', ctrlUser.deleteUser);
router.get('/users/:username', ctrlUser.getUserInfo);
router.post('/users', ctrlUser.updateUser);
router.post('/register_user', ctrlUser.registration);


// user
router.post('/changepassword', ctrlUser.changePassword);
router.post('/user', ctrlUser.updateProfile);


//books
router.get('/books', ctrlBook.getBooks);
router.post('/addBook', ctrlBook.addBook);
router.post('/comment', ctrlBook.comment);

//
router.post('/readBook', ctrlUser.addReadBook);
router.post('/readingBook', ctrlUser.addReadingBook);

router.get('/book/:id', ctrlBook.getBook);

// zanr
router.get('/zanr', ctrlZanr.getZanrs);
router.post('/zanr', ctrlZanr.addZanr);
//router.delete('/zanr/:id', ctrlZanr.deleteZanr);
router.post('/newZanr', ctrlZanr.addZanr);


// events
router.get('/events', ctrlEvent.getEvents);


module.exports = router;
