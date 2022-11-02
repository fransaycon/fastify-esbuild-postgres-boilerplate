import Joi from "joi"

export const unsavedItemSchema = Joi.object({
  name: Joi.string().min(5).max(255).required().trim(),
  description: Joi.string().min(5).max(2000).required().trim(),
})
