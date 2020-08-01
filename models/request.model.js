const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
  fromLanguage:{
    type: String,
    required: true
  },
  toLanguage:{
    type: String,
    required: true
  },
  startDate:{
    type: Date,
    required: true
  },
  finishDate:{
    type: Date,
    required: true
  },
  assignedTo:{
    type: String,
    default: "Not Assigned"
  },
  madeBy:{
    type: String,
    required: true
  }
});
const Request = mongoose.model('Request', requestSchema);

module.exports = Request;