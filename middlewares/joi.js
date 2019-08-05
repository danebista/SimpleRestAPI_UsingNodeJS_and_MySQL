const Joi = require('joi');
module.exports = {
    checker: function (req, res, next) {
        const {
            error
        } = validateCourse(req.body);
        if (error) {
            next({
                message: error.details[0].message,
                status: 404
            })

            return;
        }
        next();
    }
}

function validateCourse(c) {
    const schema = {
        name: Joi.string().min(3).required(),
    };
    return Joi.validate(c, schema);
}

/*module.exports = {
    validation
}
*/