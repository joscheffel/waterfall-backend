import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("A valid id");

export const IdObjectSpec = Joi.object().keys({
  id: IdSpec,
});

export const UserCredentialsSpec = Joi.object().keys({
  email: Joi.string().email().example("homer@simpson.com").required(),
  password: Joi.string().example("secret").required(),
});

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
  isAdmin: Joi.boolean().example("false").optional().default(false),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const LocationSpec = Joi.object().keys({
  lat: Joi.number().min(-90).max(90).example(43.0799).required(),
  long: Joi.number().min(-180).max(180).example(-79.0747).required(),
});

export const ContinentSpec = Joi.string().valid("Europe", "North America", "South America", "Africa", "Asia", "Australia").example("North America");

export const SizeSpec = Joi.string().valid("Small", "Medium", "Large").example("large");

export const CategorySpec = Joi.object().keys({
  continent: ContinentSpec.required(),
  size: SizeSpec.required(),
});

export const WaterfallSpec = Joi.object()
  .keys({
    name: Joi.string().example("Niagara Falls").required(),
    location: LocationSpec.required(),
    description: Joi.string().example("Amazing falls").optional(),
    categories: CategorySpec.required(),
    userid: IdSpec,
  })
  .label("WaterfallDetails");

export const WaterfallSpecPlus = WaterfallSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("WaterfallDetailsPlus");

export const WaterfallArray = Joi.array().items(WaterfallSpecPlus).label("WaterfallArray");
