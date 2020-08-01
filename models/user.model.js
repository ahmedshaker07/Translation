const mongoose = require('mongoose');
const Request = require('./request.model').schema;
const Schema = mongoose.Schema;

const userSchema = new Schema(
{
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  password:{
      type: String,
      required: true,
      trim: true,
      minlength: 3
  },
  firstName:{
    type: String,
    required: true
  },
  lastName:{
    type: String,
    required: true
  }
},
{
  discriminatorKey: "usertype"
}
);

const adminSchema = new Schema({
  name: String
});

const translatorSchema = new Schema({
  languages:[String],
  blockedDates:[Date],
  blockedDays:[String],
  requests: [Request]
});

const clientSchema = new Schema({
  requests: [Request]
});

const User = mongoose.model('User', userSchema);
const Admin = User.discriminator('Admin', adminSchema); 
const Translator = User.discriminator('Translator', translatorSchema); 
const Client = User.discriminator('Client', clientSchema); 

module.exports = {
  User: User,
  Admin: Admin,
  Client: Client,
  Translator: Translator
};