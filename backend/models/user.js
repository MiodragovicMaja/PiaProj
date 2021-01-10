const mongoose= require('mongoose');
const uniqueValidator= require("mongoose-unique-validator");


const userSchema= new mongoose.Schema({
  username: {type: String, required: true, unique:true},
  password:{type: String, required: true},
  userType:{type: String, required: true},
  firstname:{type: String, required: true},
  lastname:{type: String, required: true},
  date:{type: Date, required: true},
  email:{type: String, required:true},
  place: { type: String,  required:true},
  imagePath:{ type: String,  required:true},
  nizProcitanih: [],
  nizKojeTrenutnoCita:[]
});


userSchema.plugin(uniqueValidator);

mongoose.model('User', userSchema, 'users');

