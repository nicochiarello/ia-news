const FeatureNewCard = ({ span }: { span?: string }) => {
  return (
    <div
      className={`flex flex-col p-4 justify-end w-full h-full shadow-xl ${
        span && span
      }`}
    >
      <h2 className="text-lg font-semibold">Category</h2>
      <p className="text-2xl font-semibold">This is a basic title</p>
    </div>
  );
};

export default FeatureNewCard;
