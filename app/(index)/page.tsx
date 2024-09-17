import CategoryList from "./components/category-list/CategoryList";
import FeaturedNews from "./components/featured-news/FeaturedNews";
import LatestNews from "./components/latest-news/LatestNews";

export const getNews = async () => {
  const response = await fetch("http://localhost:3000/api/news/get");
  const data = await response.json();

  return data.news;
};

export default async function Home() {
  const newsReponse = await getNews();

  return (
    <div className="flex flex-1 flex-col">
      <CategoryList />
      <FeaturedNews />
      <LatestNews news={newsReponse}/>
    </div>
  );
}
