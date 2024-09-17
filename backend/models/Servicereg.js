const mongoose = require('mongoose');

const serregschema = new mongoose.Schema({
    fullname: String,
    emailid: String,
    model: String,
    service: String,
    date: Date,
    status: { type: String, default: 'pending' } // Default status is 'pending'
});

const SerRegModel = mongoose.model('ser_reg_form', serregschema);
module.exports = SerRegModel;
