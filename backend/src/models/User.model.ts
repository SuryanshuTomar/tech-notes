import { Document, Schema, model } from "mongoose";

export interface User extends Document {
	username: string;
	password: string;
	roles: "Employee" | "Moderator" | "Admin";
	active: boolean;
	createdAt: Date;
	updatedAt: Date;
}

const userSchema = new Schema<User>({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	roles: [
		{
			type: String,
			default: "Employee",
		},
	],
	active: {
		type: Boolean,
		default: true,
	},
});

export const UserModel = model<User>("User", userSchema);
