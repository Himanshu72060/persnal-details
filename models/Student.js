const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    fatherName: String,
    motherName: String,
    dateOfBirth: Date,
    gender: String,
    mobileNo: String,
    aadharNo: String,
    emailId: String,
    category: String,
    nationality: String,
    fatherOrHusbandOccupation: String,
    debarred: Boolean,
    images: [String] // Store image file paths
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
