const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },

  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    unique: true,
  },

  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },

  address: {
    street: {type: String},
    city: {type: String},
    state: {type: String},
    zip: {type: String},
  },

  organization: {
    type:String
  },
}, {timestamp:true});

module.exports = mongoose.model("Customer", customerSchema);
