const uuid = require('uuid');
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const User = require('../models/user');

const DUMMY_USERS = [
    {
        id: "u1",
        name: "Tanvi Sanyal",
        email: "test@test.com",
        password: "testers"
    }
];

const getUsers = (req, res, next) => {
    res.json({ users: DUMMY_USERS });
};

const signup = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        throw new HttpError("Invalid input passed.Please check your data", 422);
    }

        const { name, email, password } = req.body;

        let existingUser;
        try{
            existingUser = await User.findOne({email : email});

        }
        catch(err)
        {
            const error = new HttpError('Signing up failed!! Please try again later',500);
            return next(error);
        }

        if(existingUser)
        {
            const error = new HttpError('User exists already. Please login instead.',422);
            return next(error);
        }
       
        const createdUser =new User({
            // id: uuid.v4(),n
            name,
            email,
            image: "https://builtin.com/sites/default/files/styles/og/public/2019-06/Random%20Forest%20Algorithm%20Hero.jpg",
            password,
            places
        });

        try{
            await createdUser.save();
            console.log("user created");
            }
            catch(err){
              const error = new HttpError('Signing up failed ! Please try again',500);
              return next(error);
            }
        res.status(201).json({ user: createdUser.toObject({getters : true}) });
    };

    const login = (req, res, next) => {
        const { email, password } = req.body;
        const identifiedUser = DUMMY_USERS.find(u => u.email === email);
        if (!identifiedUser || identifiedUser.password !== password) {
            throw new HttpError("could not find user.may be wrong credential", 401);
        }
        res.json({ message: "logged in" })
    };

    exports.getUsers = getUsers;
    exports.signup = signup;
    exports.login = login;