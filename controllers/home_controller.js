const Record = require('../models/record'); // Import the Record model

module.exports.home = async function(req, res) {
    try {
        if (req.user) {
            let userRecords = await Record.find({ user: req.user._id });

            return res.render("index", {
                title: "Home",
                records: userRecords,
                user: req.user // Pass the user object to the template
            });
        }

        // If user is not authenticated, handle accordingly
        return res.render("index", {
            title: "Home",
            records: [] // Empty array when user is not authenticated
        });
    } catch (error) {
        console.error(error, 'error in fetching records');
        return res.status(500).send('Internal server error');
    }
};
