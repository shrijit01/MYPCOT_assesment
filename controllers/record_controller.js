const Record = require('../models/record');
const User = require('../models/user');
const mongoose = require('mongoose');


module.exports.show = async function (req, res) {
    try {
        return res.render("createRecord", {
            title: "create Record",
        });
    } catch (error) {
        console.error(error, 'error in fetching record');
        return res.status(500).send('Internal server error');
    }
};


module.exports.recordData = async function (req, res) {
    try {
        const recordId = req.params.id;
        const foundRecord = await Record.findById(recordId);

        if (!foundRecord) {
            return res.status(404).send('Record not found');
        }

        return res.render("showRecord", {
            title: "show Record",
            record: foundRecord 
        });
    } catch (error) {
        console.error(error, 'error in fetching record');
        return res.status(500).send('Internal server error');
    }
};



module.exports.create = async function (req, res) {
    try {
        let createdRecord = await Record.create({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            status: req.body.status,
            user: req.user._id
        });

        if (!createdRecord) {
            return res.status(500).json({ message: 'Error in project creation' });
        }

        const userUpdate = await User.findByIdAndUpdate(
            req.user._id,
            { $push: { records: createdRecord._id } }
        );

        if (!userUpdate) {
            // Handle the case when the user update fails
            return res.status(500).json({ message: 'Error in updating user records' });
        }

        return res.redirect('/');
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Error in project creation' });
    }
};


module.exports.updateRecord = async function (req, res) {
    try {
        const recordId = req.params.id;
        console.log("recordId", recordId);
        // Find the record by ID
        const recordToUpdate = await Record.findById(recordId);
        console.log("recordToUpdate", recordToUpdate);

        if (!recordToUpdate) {
            // If the record doesn't exist, return an error
            return res.status(404).send('Record not found');
        }

        //updating record
        recordToUpdate.name = req.body.name;
        recordToUpdate.description = req.body.description;

        // Save the updated record bcz we have changed
        await recordToUpdate.save();

        // Redirect back to the record details 
        return res.redirect('back');
    } catch (error) {
        console.error(error, 'error in updating record');
        return res.status(500).send('Error in updating record');
    }
};

module.exports.deleteRecord = async function (req, res) {
    try {
        const recordId = req.params.id;

        // found and delete the record by ID
        const deletedRecord = await Record.findByIdAndRemove(recordId);

        if (!deletedRecord) {
            console.log('Record not found.');
            return res.status(404).send('Record not found.');
        }

        // Remove the record ID from the user's records array
        await User.findByIdAndUpdate(
            req.user._id,
            { $pull: { records: recordId } }
        );

        // Redirect back to the main page
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error deleting record');
    }
};


module.exports.bulkDelete = async (req, res) => {
    try {
        // if user is not authenticated
        if (!req.isAuthenticated()) {
            return res.redirect('/users/sign-in'); // Redirect to the sign-in page if not authenticated
        }

        // Get the currently logged-in user's ID
        const userId = req.user._id;
        // Delete all records for the user
        let data = await Record.deleteMany({ user: userId });
        // Redirect back to the main page or any other desired page
        return res.redirect('/');
    } catch (error) {
        console.error('Error deleting user records:', error);
        return res.status(500).send('Error deleting user records');
    }
}
