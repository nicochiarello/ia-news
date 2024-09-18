import CategoryList from "../components/category-list/CategoryList";
import FeaturedNews from "./components/featured-news/FeaturedNews";
import LatestNews from "./components/latest-news/LatestNews";
import mongoose from "mongoose";
import { News } from "../schemas/NewsSchema";

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

const getNews = async (): Promise<Record<string, string>[]> => {
  try {
    await connectDB(); // Conectar a la base de datos

    const news = await News.find({}); // Obtener todas las noticias

    return news;
  } catch {
    throw new Error("Error al obtener las noticias");
  }
};

// once a day
export const revalidate = 86400;

export default async function Home() {
  const newsReponse = await getNews();

  return (
    <div className="flex flex-1 flex-col">
      <CategoryList />
      <FeaturedNews featured={newsReponse.slice(0, 4)} />
      <LatestNews news={newsReponse.slice(4, 25)} />
    </div>
  );
}
