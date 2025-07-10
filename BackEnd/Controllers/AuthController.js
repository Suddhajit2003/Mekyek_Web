const UserModel = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const env = require('dotenv');
const wrapAsync = require('../utils/wrapAsync');
const { oauth2client } = require('../utils/googleconfig');


const signup = wrapAsync(async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    console.log(email, password, firstName, lastName, req.body);

    const user = await UserModel.findOne({ email: email });
    if (user) {
        console.log('User already exists');
        return res.status(409).json({ message: 'User already exists', success: false });
    }

    // if (!name || !email || !password || !phoneNumber) {
    //     return res.status(400).json({ message: 'All fields are required' });
    // }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ email: email, password: hashedPassword, firstName: firstName, lastName: lastName });
    const savedUser = await newUser.save();

    const jwtToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
    console.log('User created successfully');
    res.status(201).json({ message: 'User created successfully', success: true, user: savedUser, token: jwtToken });
}
);

const login = wrapAsync(async (req, res) => {
    console.log('Login request received');
    console.log(req.body);
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
        console.log('User not found');  
        return res.status(403).json({ message: 'User not found', success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        console.log('Invalid credentials');
        return res.status(403).json({ message: 'Invalid credentials', success: false });
    }

    const jwtToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

    res.status(200).json({ message: 'Login successful', token: jwtToken, success: true, user: user });
});

const googleLogin = wrapAsync(async (req, res) => {
    const { code } = req.query;

    const googleRes = await oauth2client.getToken(code);

    oauth2client.setCredentials(googleRes.tokens);
    
    const userRes = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );

    const { email, given_name, family_name, picture } = userRes.data;

    let user = await UserModel.findOne({ email });

    if (user) {
        user = await UserModel
        .findOneAndUpdate({ email }, { firstName: given_name, lastName: family_name, profilePhoto: picture }, { new: true });
    }

    if (!user) {
        user = await UserModel.create({ firstName: given_name, lastName: family_name, email, profilePhoto: picture });
    }

    const {_id} = user;

    const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
    
    res.status(200).json({ message: 'Login successful', token, success: true, user }); 
});  

module.exports = {
    signup,
    login,
    googleLogin,
}