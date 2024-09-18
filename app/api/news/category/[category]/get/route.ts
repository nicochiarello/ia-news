import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { News } from "../../../create/route";
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
export async function GET(req: NextRequest, { params }: { params: { category: string } }) {
  const category = params.category

  // Conectar a la base de datos
  await connectDB();

  try {
    // Buscar todas las noticias que coincidan con la categoría
    const foundCategory = categories.find(
      (cat) => normalizeString(cat.name) === category
    );

    if (!foundCategory) {
      return NextResponse.json(
        { message: "Categoría no encontrada" },
        { status: 404 }
      );
    }

    const newsByCategory = await News.find({ category: foundCategory.name }).sort({
      createdAt: -1,
    });

    if (newsByCategory.length === 0) {
      return NextResponse.json(
        { message: "No se encontraron noticias para esta categoría" },
        { status: 404 }
      );
    }

    // Devolver las noticias encontradas
    return NextResponse.json(
      {
        message: "Noticias encontradas",
        news: newsByCategory,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al buscar noticias:", error);
    return NextResponse.json(
      { message: "Error al buscar noticias", error },
      { status: 500 }
    );
  }
}
