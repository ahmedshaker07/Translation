const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requestSchema = new Schema({
  owner:{
    type: String,
    required: true
  },
  fromLanguage:{
    type: String,
    required: true
  },
  toLanguage:{
    type: String,
    required: true
  },
  assignedTo:{
    type: String,
    default: null
  },
  assignedDate:{
    type: Date,
    default: null
  },
  status:{
    type:Boolean,
    default: false
  }
});
const Request = mongoose.model('Request', requestSchema);

module.exports = Request;