import mongoose from "mongoose";
import { News } from "../create/route";
import { NextResponse } from "next/server";

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

export async function GET() {
  try {
    await connectDB(); // Conectar a la base de datos

    const news = await News.find({}); // Obtener todas las noticias

    return NextResponse.json({ news }, { status: 200 });
  } catch (error) {
    console.error("Error al obtener las noticias:", error);
    return NextResponse.json(
      { message: "Error al obtener las noticias", error },
      { status: 500 }
    );
  }
}
