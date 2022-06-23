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

export const LocationSpec = Joi.object().keys({
  lat: Joi.number().min(-90).max(90).required(),
  long: Joi.number().min(-180).max(180).required(),
});

export const ContinentSpec = Joi.string().valid("Europe", "North America", "South America", "Africa", "Asia", "Australia");

export const SizeSpec = Joi.string().valid("Small", "medium", "large");

export const CategorySpec = Joi.object().keys({
  continent: ContinentSpec.required(),
  size: SizeSpec.required(),
});

export const WaterfallSpec = Joi.object().keys({
  name: Joi.string().required(),
  location: LocationSpec.required(),
  description: Joi.string().optional(),
  categories: CategorySpec.required(),
  userid: IdSpec,
});

export const WaterfallSpecPlus = WaterfallSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
});

export const WaterfallArray = Joi.array().items(WaterfallSpecPlus);
