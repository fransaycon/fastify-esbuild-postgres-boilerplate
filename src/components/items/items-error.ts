import ApiError from "../api-error"
import Joi from "joi"

export class UnsavedItemValidationError extends ApiError<Joi.ValidationError> {
  constructor(payload: Joi.ValidationError) {
    super(400, "Invalid user input from schema validation was found.", payload)
  }
}
