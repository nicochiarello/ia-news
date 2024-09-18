import Image from "next/image";
import RelatedNewsCard from "./components/RelatedNewsCard";
import mongoose from "mongoose";
import { News } from "@/app/api/news/create/route";

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

export async function getPost(id: string) {
  // Conectar a la base de datos
  await connectDB();

  try {
    // Buscar la noticia por el slug
    const decodedId = decodeURIComponent(id);
    const news = await News.findOne({ slug: decodedId });

    if (!news) {
      throw new Error(`Noticia ${id} no encontrada`);
    }

    // Buscar las 5 últimas noticias (ordenadas por fecha de creación)
    const latestNews = await News.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title slug imageUrl createdAt");

    // Devolver la noticia encontrada, noticias relacionadas y las últimas 10 noticias
    return {
      news: news,
      latestNews,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function Page({ params }: { params: { name: string } }) {
  const response = await getPost(params.name);

  const post = response?.news;
  const latestPosts = response?.latestNews || [];
  return (
    <div className="flex w-full flex-col md:flex-row md:flex-1 gap-12 lg:gap-[6rem] my-8">
      <div className="flex-1 flex flex-col gap-6">
        <Image
          className="object-cover"
          src={post.imageUrl || "https://via.placeholder.com/600"}
          height={800}
          width={800}
          alt="Imagen de la noticia"
        />
        <p className="text-xl text-primary">{post.category}</p>
        <h1 className="font-semibold text-3xl">{post.title}</h1>
        <div className="flex flex-col gap-4">
          <p className="text-xl">{post.description}</p>
          <div className="h-[1px] w-[10rem] bg-primary"></div>
        </div>
        <p className="text-xl">{post.body}</p>
      </div>

      <div className="w-full h-[15rem] md:h-fit mb-8 md:w-[15rem]">
        <div className="w-full h-full overflow-x-scroll overflow-y-hidden flex md:flex-col gap-4 md:gap-0">
          {latestPosts.map((post: Record<string, string>) => (
            <RelatedNewsCard key={post.slug} data={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
