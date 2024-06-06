const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name:String,
    number:String,
    email:String,
    message:String
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;