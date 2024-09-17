import FeatureNewCard from "./card/FeatureNewCard";

const FeaturedNews = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-[48rem] md:h-[30rem] gap-4 w-full mt-8">
      {Array.from({ length: 4 }).map((_, index) => (
        <FeatureNewCard
          key={index}
          span={
            // if index is 0, span will be "row-span-2"
            // in index is 3, span will be "col-span-2"
            // else, span will be empty
            index === 0 ? "col-span-2 md:col-span-1 md:row-span-2" : index === 3 ? "md:col-span-2" : ""
          }
        />
      ))}
    </div>
  );
};

export default FeaturedNews;
