import mongoose, { Schema, Document } from "mongoose";

export interface Conversation extends Document {
  userId: string;
  prompt: string;
  response: string;
  createdAt: Date;
}

const ConversationSchema = new Schema<Conversation>({
  userId: { type: String, required: true },
  prompt: { type: String, required: true },
  response: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const ConversationModel = mongoose.model<Conversation>(
  "Conversation",
  ConversationSchema
);
