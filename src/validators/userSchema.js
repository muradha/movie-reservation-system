import Joi from "joi";

const baseSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
});

const create = baseSchema.keys({
  password: Joi.string().required(),
});

const update = baseSchema.keys({
  password: Joi.string().optional(),
});

export default {
    create,
    update
};
