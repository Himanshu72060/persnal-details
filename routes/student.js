const express = require('express');
const router = express.Router();
const multer = require('multer');
const Student = require('../models/Student');
const path = require('path');

// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Create student with 3 image uploads
router.post('/', upload.array('images', 3), async (req, res) => {
    try {
        const imagePaths = req.files.map(file => file.path);
        const student = new Student({ ...req.body, images: imagePaths });
        await student.save();
        res.status(201).json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all students
router.get('/', async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

// Get student by ID
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ error: "Not found" });
        res.json(student);
    } catch {
        res.status(400).json({ error: "Invalid ID" });
    }
});

// Update student
router.put('/:id', upload.array('images', 3), async (req, res) => {
    try {
        const imagePaths = req.files.length ? req.files.map(f => f.path) : undefined;
        const updateData = { ...req.body };
        if (imagePaths) updateData.images = imagePaths;

        const student = await Student.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!student) return res.status(404).json({ error: "Not found" });
        res.json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete student
router.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) return res.status(404).json({ error: "Not found" });
        res.json({ message: "Deleted successfully" });
    } catch {
        res.status(400).json({ error: "Invalid ID" });
    }
});

module.exports = router;
