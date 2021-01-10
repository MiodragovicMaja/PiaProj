const mongoose = require('mongoose');

var registrationRequestSchema = new mongoose.Schema({
  username: {type: String, required: true, unique:true},
  password:{type: String, required: true},
  userType:{type: String, required: true},
  firstname:{type: String, required: true},
  lastname:{type: String, required: true},
  date:{type: Date, required: true},
  email:{type: String, required:true},
  place: { type: String,  required:true},
  imagePath:{ type: String,  required:true}
});

mongoose.model('RegistrationRequest', registrationRequestSchema, 'registrationRequests');
