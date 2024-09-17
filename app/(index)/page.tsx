import CategoryList from "./components/category-list/CategoryList";
import FeaturedNews from "./components/featured-news/FeaturedNews";
import LatestNews from "./components/latest-news/LatestNews";

export const getNews = async () => {
  const response = await fetch("http://localhost:3000/api/news/get", {
    next: {
      revalidate: 0,
    },
  });
  const data = await response.json();

  return data.news;
};

export default async function Home() {
  const newsReponse = await getNews();

  return (
    <div className="flex flex-1 flex-col">
      <CategoryList />
      <FeaturedNews featured={newsReponse.slice(0, 4)} />
      <LatestNews news={newsReponse.slice(4)} />
    </div>
  );
}
