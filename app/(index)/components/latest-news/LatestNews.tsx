import LatestNewCard from "./latest-new-card/LatestNewCard";

const LatestNews = () => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-3xl font-semibold mt-14">Latest news</h3>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3  gap-x-2 gap-y-8">
        {Array.from({ length: 12 }).map((_, index) => (
          <LatestNewCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
