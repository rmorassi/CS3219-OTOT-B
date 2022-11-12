/* ----- IMPORTS ----- */

import express from 'express';
import {index, create, view, update, remove} from './studentController.js'
import {temp} from './serverlessFunction.js'


/* ----- API ROUTES ----- */

const router = express.Router();

// Base route
router.get('/', function (req, res) {
    res.json({
        status: 'success',
        message: 'This is confirmation that the API works properly.',
    });
});

// Generic studentRooster routes
router.route('/studentRooster')
    .get(index)
    .post(create);

// Specific studentRooster student routes
router.route('/studentRooster/:student_id')
    .get(view)
    .put(update)
    .delete(remove);

// Serverless routes
router.route('/tempAvg')
    .get(temp)

// Export API routes
export default router;