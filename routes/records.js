const express = require('express');
const router = express.Router();
const passport = require('passport');


const recordsController = require("../controllers/record_controller");

router.get('/create',recordsController.show);
router.post('/create', passport.checkAuthentication, recordsController.create);
router.get('/record/:id', passport.checkAuthentication, recordsController.recordData);
router.post('/update/:id', passport.checkAuthentication, recordsController.updateRecord);
router.get('/delete/:id', recordsController.deleteRecord);
router.post('/delete',recordsController.bulkDelete);

module.exports = router;
