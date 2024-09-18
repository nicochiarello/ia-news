import mongoose from "mongoose";

// Crear el modelo de Mongoose para las noticias
const newsSchema = new mongoose.Schema({
  title: String,
  description: String,
  body: String,
  category: String,
  slug: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
});

export const News = mongoose.models.News || mongoose.model("News", newsSchema);
