import CategoryList from "../components/category-list/CategoryList";
import FeaturedNews from "./components/featured-news/FeaturedNews";
import mongoose from "mongoose";
import { News } from "../schemas/NewsSchema";
import { categories } from "@/utils/categories";
import { normalizeString } from "@/utils/normalizeString";

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

// Función para manejar la solicitud GET
async function getNews(category: string) {
  // Conectar a la base de datos
  await connectDB();

  try {
    // Buscar todas las noticias que coincidan con la categoría
    const foundCategory = categories.find(
      (cat) => normalizeString(cat.name) === category
    );

    if (!foundCategory) {
      throw new Error("Categoría no encontrada");
    }

    const newsByCategory = await News.find({
      category: foundCategory.name,
    }).sort({
      createdAt: -1,
    });

    if (newsByCategory.length === 0) {
      throw new Error("No se encontraron noticias para esta categoría");
    }

    // Devolver las noticias encontradas
    return newsByCategory;
  } catch (error) {
    throw new Error("Error al buscar noticias");
  }
}

// once a day
export const revalidate = 86400;

export default async function Home({
  params,
}: {
  params: {
    category: string;
  };
}) {
  const category = params.category;
  const newsReponse = await getNews(category);

  return (
    <div className="flex flex-1 flex-col">
      <CategoryList />
      <FeaturedNews featured={newsReponse} />
    </div>
  );
}
