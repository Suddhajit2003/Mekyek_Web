const { singupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const { signup, login, googleLogin } = require('../Controllers/AuthController');

const router = require('express').Router();


router.post('/login', login);
router.get('/google', googleLogin);
router.post('/signup', signup);

module.exports = router;