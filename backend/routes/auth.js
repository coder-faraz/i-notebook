
const express = require('express');
const User = require('../mongoose_models/User');
const { body, validationResult} = require('express-validator');

const router = express.Router();



//ROUTE 1 : Creating a user using POST, no login required
router.post('/createuser', [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("pw", 'Minimum 5 characters required').isLength({ min: 5 }),

], (req, res) => {

    const errors = validationResult(req);
        //If there are errors, return Bad Request & display all the errors
    if(!errors.isEmpty()) res.status(400).json({ errors: errors.array() });

    else {      //If no errors occur, create a new user with the data inside req body
        User.create({
            name: req.body.name,
            email: req.body.email,
            pw: req.body.pw,
            }
            ).then(user => res.json(user)
            ).catch(err => {
                console.log(err);
                res.json({ error: "Enter a unique value",
                        message: err.message,
            });
        });
    }
});




//ROUTE 2 : Validating Login Credentials
router.post('/loginuser', [
    body("email").isEmail(),
    body("pw", 'Minimum 5 characters required').isLength({ min: 5 }),

], async (req, res) => {
    const errors = validationResult(req);
        //If there are errors, return Bad Request & display all the errors
    if(!errors.isEmpty()) res.status(400).json({ errors: errors.array() });

    const {email, pw} = req.body;

    try {      //If no errors occur, find the user with the given login credentials
        let user = await User.findOne({ email });
        if(!user) res.status(400).json({ error: "Enter Valid Credentials.." });
        res.json({message: "Logged In Successfully!"});
    }
    catch(err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error..");
    }
});



module.exports = router;
