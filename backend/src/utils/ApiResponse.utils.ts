export class ApiResponse {
	constructor(
		public statusCode: number,
		public message: string = "Success",
		public data: null | Object = null,
		public success: boolean
	) {
		this.success = statusCode < 400;
	}

	// Method to check if the response has data
	hasData(): boolean {
		return this.data !== null;
	}

	// Method to get a formatted message
	getFormattedMessage(): string {
		return `${this.success ? "Success" : "Error"}: ${this.message}`;
	}

	// Method to get the response as a JSON object
	toJson(): Record<string, any> {
		return {
			statusCode: this.statusCode,
			message: this.message,
			data: this.data,
			success: this.success,
		};
	}
}
