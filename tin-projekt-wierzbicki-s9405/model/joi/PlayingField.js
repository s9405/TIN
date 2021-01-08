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
            default:
                break;
        }
    });
    return errors;
};

const playerSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow(""),
    name: Joi.string()
        .min(2)
        .max(20)
        .required()
        .error(errMessages),
    adress: Joi.string()
        .min(2)
        .max(20)
        .required()
        .error(errMessages),
    cloackroom: Joi.string()
        .min(1)
        .max(1)
        .required()
        .error(errMessages)
});



module.exports = playerSchema;