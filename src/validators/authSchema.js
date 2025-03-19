import Joi from "joi";

const baseSchema = Joi.object({
    password: Joi.string().required(),
});

const login = baseSchema.keys({
    email: Joi.string().email().required(),
});

const register = baseSchema.keys({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
});

export default {
    login,
    register
};
