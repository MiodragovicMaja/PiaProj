const { strict } = require('assert');
const mongoose= require('mongoose');
const uniqueValidator= require("mongoose-unique-validator");


const eventSchema= new mongoose.Schema({
  name: {type: String,  required:true,  unique:true},
  dateFrom: {type:Date, required:true},
  dateTo: {type:Date, required:true}
});

eventSchema.plugin(uniqueValidator);

mongoose.model('Event', eventSchema, 'events');

