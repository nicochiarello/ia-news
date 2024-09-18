"use client";

import { categories } from "@/utils/categories";
import { normalizeString } from "@/utils/normalizeString";
import Link from "next/link";
import { useParams } from "next/navigation";

const CategoryList = () => {
  const params = useParams();

  const givenCategory = params.category;
  return (
    <ul className="flex justify-center w-full h-fit py-2 gap-x-6 gap-y-2 mt-2 px-4 flex-wrap">
      <Link
        href={"/"}
        className={`text-xl cursor-pointer hover:font-semibold ${
          givenCategory === undefined ? "font-semibold" : ""
        }`}
      >
        Inicio
      </Link>
      {categories.map((category) => (
        <Link
          href={`/${normalizeString(category.name)}`}
          className={`text-xl cursor-pointer hover:font-semibold ${
            normalizeString(category.name) === givenCategory ? "font-semibold" : ""
          }`}
          key={category.name}
        >
          {category.name[0].toUpperCase()}
          {category.name.slice(1)}{" "}
        </Link>
      ))}
    </ul>
  );
};

export default CategoryList;
