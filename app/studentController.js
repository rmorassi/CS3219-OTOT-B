/* ----- IMPORTS ----- */

Student = require('./studentModel');

/* ----- ACTION HANDLERS ----- */

// Handle index actions
exports.index = function (req, res) {
    Student.get(function (err, students) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        } else {
            res.json({
                status: "success",
                message: "Students retrieved successfully",
                data: students
            });
        }
    });
};

// Handle create student actions
exports.new = function (req, res) {
    var student = new Student();
    student.name = req.body.name;
    student.house = req.body.house;
    student.roomNumber = req.body.roomNumber;
    student.gender = req.body.gender;
    // save the student and check for errors
    student.save(function (err) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        } else {
            res.json({
                message: 'New student created!',
                data: student
            });
        }
    });
};

// Handle view student info
exports.view = function (req, res) {
    Student.findById(req.params.student_id, function (err, student) {
        if (err) {
            res.send(err);
        } else {
            res.json({
                message: 'Student details loading..',
                data: student
            });
        }
    });
};

// Handle update student info
exports.update = function (req, res) {
    Student.findById(req.params.student_id, function (err, student) {
        if (err) {
            res.send(err);
        } else {
            student.name = req.body.name ? req.body.name : student.name;
            student.house = req.body.house ? req.body.house : student.house;
            student.roomNumber = req.body.roomNumber ? req.body.roomNumber : student.roomNumber;
            student.gender = req.body.gender ? req.body.gender : student.gender;
            // save the student and check for errors
            student.save(function (err) {
                if (err) {
                    res.json({
                        status: "error",
                        message: err,
                    });
                } else {
                    res.json({
                        message: 'Student Info updated',
                        data: student
                    });
                }
            });
        }
    });
};

// Handle delete student
exports.delete = function (req, res) {
    Student.remove({
        _id: req.params.student_id
    }, function (err, student) {
        if (err) {
            res.send(err);
        } else {
            res.json({
                status: "success",
                message: 'Student deleted'
            });
        }
    });
};