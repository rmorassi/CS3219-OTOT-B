/* ----- IMPORTS ----- */

let router = require('express').Router();
var studentController = require('./studentController');


/* ----- API ROUTES ----- */

// Base route
router.get('/', function (req, res) {
    res.json({
        status: 'OK',
        message: 'This is confirmation that the API works properly.',
    });
});

// Generic studentRooster routes
router.route('/studentRooster')
    .get(studentController.index)
    .post(studentController.new);

// Specific studentRooster student routes
router.route('/studentRooster/:student_id')
    .get(studentController.view)
    .put(studentController.update)
    .delete(studentController.delete);


// Export API routes
module.exports = router;