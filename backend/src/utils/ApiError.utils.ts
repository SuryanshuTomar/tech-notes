export class ApiError extends Error {
	public data = null;
	public success = false;
	constructor(
		public statusCode: "500",
		public message = "Something went wrong!",
		public error: [],
		stack = ""
	) {
		super(message);

		if (stack) {
			this.stack = stack;
		} else {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}
