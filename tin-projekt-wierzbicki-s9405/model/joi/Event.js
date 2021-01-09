const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "number.empty":
                err.message = "Pole jest wymagane";
                break;
            case "number.min":
                err.message = `Minimalna wartość to ${err.local.limit}`;
                break;
            case "number.max":
                err.message = `Maxymalna wartość to ${err.local.limit}`;
                break;
            case "date.empty":
                err.message= "Pole jest wymagane";
                break;
            default:
                break;
        }
    });
    return errors;
};
const eventSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow(""),
    playerId: Joi.number()
        .required()
        .error(errMessages),
    playingFieldId: Joi.number()
        .required()
        .error(errMessages),
    beginTime: Joi.date()
        .required()
        .error(errMessages),
    endTime: Joi.date()
        .required()
        .error(errMessages),
    maxNumberOfPlayer: Joi.number()
        .required()
        .min(1)
        .max(10)
        .error(errMessages)
});
module.exports = eventSchema;