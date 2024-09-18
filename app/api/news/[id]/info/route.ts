import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { News } from "../../create/route";

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
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  // Conectar a la base de datos
  await connectDB();

  try {
    // Buscar la noticia por el slug
    const news = await News.findOne({ slug: id });

    if (!news) {
      return NextResponse.json({ message: "Noticia no encontrada" }, { status: 404 });
    }

    // Buscar las 5 últimas noticias (ordenadas por fecha de creación)
    const latestNews = await News.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title slug imageUrl createdAt");

    // Devolver la noticia encontrada, noticias relacionadas y las últimas 10 noticias
    return NextResponse.json({
      message: "Noticia encontrada",
      data: {
        news,
        latest: latestNews,
      },
    }, { status: 200 });

  } catch (error) {
    console.error("Error al buscar la noticia:", error);
    return NextResponse.json({ message: "Error al buscar la noticia", error }, { status: 500 });
  }
}
