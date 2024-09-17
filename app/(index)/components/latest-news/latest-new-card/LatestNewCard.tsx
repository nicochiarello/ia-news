import Image from "next/image";

const LatestNewCard = ({ data }: { data: Record<string, string> }) => {
  return (
    <div className="flex flex-col w-full h-[28rem] justify-between cursor-pointer hover:shadow-lg">
      <div className="w-full h-[50%] bg-blue-200 relative">
        <Image
          className="w-full h-full object-cover"
          src={data.imageUrl || "https://via.placeholder.com/600"}
          alt="latest new"
          width={600}
          height={600}
        />
        <div className="w-[85%] p-2 bg-gray-200 absolute bottom-0 left-0 translate-y-[60%]">
          <p className="font-semibold text-2xl truncate">
            {data.title || "Titulo de la noticia"}
          </p>
          <p className="hidden md:block truncate">
            {data.description || "Descripción de la noticia"}
          </p>
          <div className="w-[40%] h-[1.5px] bg-primary mt-4"></div>
        </div>
      </div>
      <div className="p-2 mt-[3.5rem] flex-1">
        <p className="truncate-4-lines">
          {data.description || "Descripción de la noticia"}
        </p>
      </div>

      <div className="py-4 px-2">
        <p className="text-primary">
          {data.category || "Categoría de la noticia"}
        </p>
      </div>
    </div>
  );
};

export default LatestNewCard;
