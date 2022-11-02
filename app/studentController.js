/* ----- IMPORTS ----- */

import Student from './studentModel.js';

/* ----- ACTION HANDLERS ----- */

// Handle index actions
export async function index(req, res) {
    try {
        return res.json({
            status: 'success',
            message: 'Students records retrieved.',
            data: await Student.find()
        });
    } catch (err) {
        return res.json({status: 'error', message: err})
    }
}

// Handle create student actions
export async function create(req, res) {
    try {
        const {name, house, roomNumber, gender} = req.body;
        if (!name || !house || !roomNumber) {
            return res.json({
                status: 'not success',
                message: 'Cannot create student record. Required fields were missing.'
            });
        }
        const student = new Student({
            name: name,
            house: house,
            roomNumber: roomNumber,
            gender: gender
        });
        await student.save();
        return res.json({
            status: 'success',
            message: 'New student record created.',
            data: student
        });
    } catch (err) {
        if (err.name == 'ValidationError') {
            return res.json({
                status: 'not success',
                message: 'Cannot create student record. Fields were not of correct type.'
            });
        }
        return res.json({status: 'error', message: err})
    }
}

// Handle view student info
export async function view(req, res) {
    try {
        const student = await Student.findById(req.params.student_id);
        if (!student) {
            return res.json({
                status: 'not success',
                message: 'Student record was not found.'
            });
        }
        return res.json({
            status: 'success',
            message: 'Student record retrieved.',
            data: student
        });
    } catch (err) {
        return res.json({status: 'error', message: err})
    }
}

// Handle update student info
export async function update(req, res) {
    try {
        const student = await Student.findById(req.params.student_id);
        if (!student) {
            return res.json({
                status: 'not success',
                message: 'Cannot modify. Student record was not found.'
            });
        }
        student.name = req.body.name ? req.body.name : student.name;
        student.house = req.body.house ? req.body.house : student.house;
        student.roomNumber = req.body.roomNumber ? req.body.roomNumber : student.roomNumber;
        student.gender = req.body.gender ? req.body.gender : student.gender;
        await student.save();
        return res.json({
            status: 'success',
            message: 'Student record updated.',
            data: student
        });
    } catch (err) {
        if (err.name == 'ValidationError') {
            return res.json({
                status: 'not success',
                message: 'Cannot modify. Fields were not of correct type.'
            });
        }
        return res.json({status: 'error', message: err})
    }
}

// Handle delete student
export async function remove(req, res) {
    try {
        const student = await Student.findOneAndRemove({_id: req.params.student_id});
        if (!student) {
            return res.json({
                status: 'not success',
                message: 'Cannot delete. Student record was not found.'
            });
        }
        return res.json({
            status: 'success',
            message: 'Student record deleted.',
            data: student
        });
    } catch (err) {
        return res.json({status: 'error', message: err})
    }
}