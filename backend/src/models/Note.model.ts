import { Document, Schema, model } from "mongoose";
import Inc from "mongoose-sequence";

export interface Note extends Document {
	user: Schema.Types.ObjectId;
	title: string;
	text: string;
	completed: boolean;
}

const noteSchema = new Schema<Note>(
	{
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		title: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		completed: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

const AutoIncrement = Inc(noteSchema);
// @ts-ignore
noteSchema.plugin(AutoIncrement, {
	inc_field: "ticket", // create the ticket field inside our noteSchema
	id: "ticketNums", // a separate collection counter will be created with this id name.
	start_seq: 500, // the start number of the ticket number to increment
});

export const NoteModel = model<Note>("Note", noteSchema);
