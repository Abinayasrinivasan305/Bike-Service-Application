// models/Admin.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // If you're storing passwords
    role: { type: String, default: 'admin' },
});

const AdminModel = mongoose.model('Admin', adminSchema);

module.exports = AdminModel;
