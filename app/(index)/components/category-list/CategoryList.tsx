import { categories } from "@/utils/categories";

const CategoryList = () => {
  return (
    <ul className="flex justify-center w-full h-fit py-2 gap-x-6 gap-y-2 mt-2 px-4 flex-wrap">
      <li className="text-xl cursor-pointer hover:font-semibold">Inicio</li>
      {categories.map((category) => (
        <li
          className="text-xl cursor-pointer hover:font-semibold"
          key={category}
        >
          {category[0].toUpperCase()}
          {category.slice(1)}{" "}
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
