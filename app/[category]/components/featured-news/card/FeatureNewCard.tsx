import Image from "next/image";
import Link from "next/link";

const FeatureNewCard = ({
  data,
  span,
}: {
  data: Record<string, string>;
  span?: string;
}) => {
  return (
    <Link
      href={`/posts/${data.slug}`}
      className={`relative ${span && span} aspect-[3/2]  hover:shadow-xl cursor-pointer`}
    >
      <div className="w-full h-full bg-black">
        <Image
          className="w-full h-full object-cover absolute top-0 left-0 opacity-80"
          src={data.imageUrl || "https://via.placeholder.com/600"}
          alt="featured new"
          width={600}
          height={600}
        />
      </div>
      <div className="absolute w-full h-fit bottom-0 p-2 text-white ">
        <h2 className="text-lg font-semibold text-primary text-shadow">
          {data.category}
        </h2>
        <p className="text-2xl font-semibold text-shadow">{data.title}</p>
      </div>
    </Link>
  );
};

export default FeatureNewCard;
