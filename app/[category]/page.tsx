import CategoryList from "../components/category-list/CategoryList";
import FeaturedNews from "./components/featured-news/FeaturedNews";

export const getNews = async (category: string) => {
  const response = await fetch(
    `http://localhost:3000/api/news/category/${category}/get`,
    {
      next: {
        revalidate: 0,
      },
    }
  );
  const data = await response.json();

  return data.news;
};

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
