import Link from "next/link";
import Image from "next/image";

const RelatedNewsCard = ({ data }: { data: Record<string, string> }) => {
  return (
    <Link
      href={`/posts/${data.slug}`}
      className="flex flex-col w-full h-fit md:h-[12rem] justify-between cursor-pointer hover:shadow-lg"
    >
      <div className="w-[14rem] md:w-full h-[50%] relative">
        <Image
          className="w-full h-[9rem] object-cover"
          src={data.imageUrl || "https://via.placeholder.com/600"}
          alt="latest new"
          width={600}
          height={600}
        />
        <div className="w-[90%] p-2 bg-gray-200 absolute bottom-0 left-0 translate-y-[100%]">
          <p className="font-semibold text-lg truncate-2-lines">
            {data.title || "Titulo de la noticia"}
          </p>
          <div className="w-[40%] h-[1.5px] bg-primary mt-4"></div>
        </div>
      </div>
    </Link>
  );
};

export default RelatedNewsCard;
