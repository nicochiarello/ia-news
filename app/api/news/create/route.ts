import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createApi } from "unsplash-js";
import mongoose from "mongoose";
import { categories } from "@/utils/categories";

// Inicializar la API de Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Inicializar la API de Unsplash
const unsplash = createApi({
  accessKey: process.env.IMAGE_API_KEY as string,
});

// Conexión a MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(process.env.MONGO_URI as string);
      console.log("Conectado a MongoDB");
    } catch (error) {
      console.error("Error conectando a MongoDB:", error);
    }
  }
};

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

// Función para generar la noticia con formato limpio
const generateNews = async (category: { name: string; query: string }) => {
  const randomDetails = [
    "fresca",
    "interesante",
    "reciente",
    "novedosa",
    "original",
    "impactante",
    "sorprendente",
    "divertida",
    "emotiva",
    "inspiradora",
    "informativa",
    "curiosa",
    "inédita",
    "inusitada",
    "inverosímil",
    "inquietante",
  ];
  const randomIndex = Math.floor(Math.random() * randomDetails.length);
  const prompt = `Genera una noticia ${randomDetails[randomIndex]} sobre la categoría "${category.name}". Proporciona un título, una descripción breve, y el cuerpo del texto completo.`;

  const result = await model.generateContent(prompt);
  const newsText = result.response.text();

  const lines = newsText.split("\n").filter((line) => line.trim() !== "");

  const cleanText = (text: string) =>
    text
      .replace(/[*#\/]/g, "")
      .replace(/\s{2,}/g, " ")
      .replace(/^\s+|\s+$/g, "")
      .replace(/\s*\n\s*/g, "\n")
      .replace(/^(Descripción:|Cuerpo del texto:)\s*/i, "")
      .replace(/\"/g, "")
      .trim();

  const news = {
    title: cleanText(lines[0] || "Título no generado"),
    description: cleanText(lines[1] || "Descripción no generada"),
    body: cleanText(lines.slice(2).join("\n") || "Cuerpo no generado"),
    category: category.name,
  };

  return news;
};

// Función para generar una consulta para Unsplash usando Gemini
const generateImageQuery = async (newsText: string) => {
  const prompt = `Genera una consulta de búsqueda para Unsplash basada en el siguiente texto: "${newsText}". Usa una o dos palabras (en ingles).`;
  const result = await model.generateContent(prompt);
  return result.response.text().trim();
};

// Función para obtener una imagen de Unsplash usando la consulta generada
const getUnsplashImage = async (query: string) => {
  try {
    const result = await unsplash.search.getPhotos({
      query,
      page: 1,
      perPage: 5,
      orientation: "landscape",
    });
    const photos = result.response?.results;
    if (photos && photos.length > 0) {
      return photos[0].urls.regular;
    }
  } catch (error) {
    console.error("Error fetching image from Unsplash:", error);
  }
  return "https://via.placeholder.com/600"; // Imagen de respaldo en caso de error
};

// Función para obtener una categoría aleatoria
export const getRandomCategory = () => {
  const randomIndex = Math.floor(Math.random() * categories.length);
  return categories[randomIndex];
};

// Función principal para generar y guardar la noticia
export async function POST() {
  await connectDB(); // Conectar a MongoDB
  const randomCategory = getRandomCategory();
  const newsData = await generateNews(randomCategory);

  // Generar la consulta de imagen usando Gemini
  const imageQuery = await generateImageQuery(newsData.title);
  const imageUrl = await getUnsplashImage(imageQuery);

  // Crear y guardar el documento en MongoDB
  const newNews = new News({
    title: newsData.title,
    description: newsData.description,
    body: newsData.body,
    category: newsData.category,
    slug: newsData.title.toLowerCase().replace(/\s+/g, "-"),
    imageUrl,
  });

  try {
    const savedNews = await newNews.save(); // Guardar la noticia en MongoDB
    return NextResponse.json(
      { message: "Noticia guardada", data: savedNews },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al guardar la noticia:", error);
    return NextResponse.json(
      { message: "Error al guardar la noticia", error },
      { status: 500 }
    );
  }
}
