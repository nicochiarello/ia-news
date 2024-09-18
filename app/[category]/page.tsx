import CategoryList from "../components/category-list/CategoryList";
import FeaturedNews from "./components/featured-news/FeaturedNews";

// once a day
export const revalidate = 86400;

export const getNews = async (category: string) => {
  const response = await fetch(
    `${process.env.DB_URI}/api/news/category/${category}/get`,
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
