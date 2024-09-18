import CategoryList from "../components/category-list/CategoryList";
import FeaturedNews from "./components/featured-news/FeaturedNews";
import LatestNews from "./components/latest-news/LatestNews";

export const getNews = async () => {
  const response = await fetch(`${process.env.DB_URI}/api/news/get`, {
    next: {
      revalidate: 0,
    },
  });
  const data = await response.json();

  return data.news;
};

// once a day
export const revalidate = 86400;

export default async function Home() {
  const newsReponse = await getNews();

  return (
    <div className="flex flex-1 flex-col">
      <CategoryList />
      <FeaturedNews featured={newsReponse.slice(0, 4)} />
      <LatestNews news={newsReponse.slice(4,25)} />
    </div>
  );
}
