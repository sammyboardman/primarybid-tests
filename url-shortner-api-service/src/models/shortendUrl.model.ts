import { Schema, model, Document } from "mongoose";

interface ShortenedUrlDocument extends Document {
  mainUrl: string;
  shortenedUrl: string;
}

const shortendUrlSchema = new Schema<ShortenedUrlDocument>(
  {
    mainUrl: {
      type: String,
      required: true,
      index: true,
    },
    shortenedUrl: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    strict: "throw",
    timestamps: true,
  }
);

const ShortenedUrl = model<ShortenedUrlDocument>(
  "ShortenedUrl",
  shortendUrlSchema
);
export default ShortenedUrl;
