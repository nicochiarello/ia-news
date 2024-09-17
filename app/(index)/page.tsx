import CategoryList from "./components/category-list/CategoryList";
import FeaturedNews from "./components/featured-news/FeaturedNews";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <CategoryList />
      <FeaturedNews />
    </div>
  );
}
