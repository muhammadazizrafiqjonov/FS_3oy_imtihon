import Joi from "joi";

class Validations {

    registerScheme = Joi.object({
        branch: Joi.string().alphanum().required(),
        username:Joi.string().alphanum().min(3).max(20).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,255}')).required(),
        birthdate: Joi.date().required(),
        gender:Joi.required()
    })

    loginScheme = Joi.object({
        username:Joi.string().alphanum().min(3).max(20).required(),
        password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,255}')).required()
    })

    branchScheme = Joi.object({
        name: Joi.string().alphanum().min(3).max(30).required(),
        address: Joi.string().alphanum().min(3).max(30).required()
    })
}

export default new Validations() 