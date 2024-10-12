const Joi = require("@hapi/joi");

const authSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .lowercase(),
  password: Joi.string().min(6).required(),
  verifyPassword: Joi.ref("password"),
});

const eventSchema = Joi.object({
  title: Joi.string().required(),
  location: Joi.string().required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
  date: Joi.date().required(),
  time: Joi.string().required(),
  price: Joi.number().min(0).required(),
  capacity: Joi.number().integer().min(1).required(),
  ticketsSold: Joi.number().integer().min(0),
  reminders: Joi.string().required(),
  createdAt: Joi.date().default(() => new Date()),
});

module.exports = {
  authSchema,
};
