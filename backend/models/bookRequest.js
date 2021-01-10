const mongoose= require('mongoose');
const uniqueValidator= require("mongoose-unique-validator");

const bookRequestSchema= new mongoose.Schema({
  title: {type: String, required: true, unique:true},
  description:{type: String, required: true},
  date:{type: Date, required: true},
  genres: [],
  authors:[],
  nizKomentara: []
});


bookRequestSchema.plugin(uniqueValidator);

mongoose.model('BookRequest', bookRequestSchema, 'bookRequest');

