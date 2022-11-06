import ApiError from "../api-error"

export class ExampleError extends ApiError {
  constructor() {
    super(400, "This is an example Api Error")
  }
}
