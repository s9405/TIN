const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "string.min":
                err.message = `Pole powinno zawierać co najmniej ${err.local.limit} znaków`;
                break;
            case "string.max":
                err.message = `Pole powinno zaiwerać co najwyżej ${err.local.limit} znaków`;
                break;
            case "string.email":
                err.message = `Pole powinno zawierać prawidłowy adres email`;
            default:
                break;
        }
    });
    return errors;
};

const updatePlayerSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow(""),
    firstName: Joi.string()
        .min(2)
        .max(20)
        .required()
        .error(errMessages),
    lastName: Joi.string()
        .min(2)
        .max(20)
        .required()
        .error(errMessages),
    email: Joi.string()
        .email()
        .required()
        .error(errMessages)
});



module.exports = updatePlayerSchema;