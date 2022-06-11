import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object());

export const IdObjectSpec = Joi.object().keys({
  id: IdSpec,
});

export const UserCredentialsSpec = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  isAdmin: Joi.boolean().optional().default(false),
});

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
});

export const UserArray = Joi.array().items(UserSpecPlus);

export const WaterfallSpec = Joi.object().keys({
  name: Joi.string().required(),
});

export const WaterfallSpecPlus = WaterfallSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
});

export const WaterfallArray = Joi.array().items(WaterfallSpecPlus);
