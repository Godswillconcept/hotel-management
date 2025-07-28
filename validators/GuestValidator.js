const {body} = require('express-validator');
const checkValidation = require('../middlewares/checkValidation');

const guestValidator = [
    body('full_name').trim().escape().isAlpha('en-US').withMessage('Only alphabet can be filled here'),
    body('email').isEmail().withMessage('Invalid email format').normalizeEmail({gmail_remove_dots:true}),
    body('address').trim().escape().isString().withMessage('Address must be a string'),
    body('phone_number').trim().escape().isMobilePhone('any').withMessage('Invalid phone number'),
    checkValidation
];

module.exports = guestValidator;