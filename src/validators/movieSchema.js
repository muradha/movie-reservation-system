import Joi from "joi";

const baseSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    duration: Joi.number().required(),
});

const create = baseSchema;

const update = baseSchema;

export default {
    create,
    update
}