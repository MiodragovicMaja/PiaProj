const { strict } = require('assert');
const mongoose= require('mongoose');
const uniqueValidator= require("mongoose-unique-validator");


const zanrSchema= new mongoose.Schema({
  name: {type: String,  required:true,  unique:true}
});



zanrSchema.plugin(uniqueValidator);

mongoose.model('Zanr', zanrSchema, 'genres');

