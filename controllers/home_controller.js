const Record = require('../models/record'); 

module.exports.home = async function(req, res) {
    try {
        if (req.user) {
            let userRecords = await Record.find({ user: req.user._id });

            return res.render("index", {
                title: "Home",
                records: userRecords,
                user: req.user 
            });
        }

        // If user is not authenticated, handle accordingly
        return res.render("index",{
            title:"Home"
        });
        
    } catch (error) {
        console.error(error, 'error in fetching records');
        return res.status(500).send('Internal server error');
    }
};
