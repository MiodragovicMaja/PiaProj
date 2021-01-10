const mongoose= require('mongoose');


const bookSchema= new mongoose.Schema({
  title: {type: String, required: true},
  description:{type: String, required: true},
  date:{type: Date, required: true},
  genres: [],
  authors:[],
  nizKomentara: []
});



mongoose.model('Book', bookSchema, 'books');

