import Joi from "joi";

const userSchema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password: Joi.string().required()
})

export default userSchema;