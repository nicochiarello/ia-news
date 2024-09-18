import FeatureNewCard from "./card/FeatureNewCard";

const FeaturedNews = ({ featured }: { featured: Record<string, string>[] }) => {
  const getGridClasses = (index: number, total: number) => {
    let colSpan = "col-span-1";
    let rowSpan = "row-span-1";

    // Define diferentes patrones de diseño en función del número total de elementos
    if (total === 1) {
      colSpan = "col-span-2";
      rowSpan = "row-span-2";
    } else if (total <= 4) {
      // Para 2-4 elementos, usa un diseño básico con 2 columnas
      if (index === 0) {
        colSpan = "col-span-2";
        rowSpan = "row-span-2";
      } else {
        colSpan = "col-span-1";
        rowSpan = "row-span-1";
      }
    } else if (total <= 6) {
      // Para 5-6 elementos, usa un diseño más ajustado
      if (index === 0) {
        colSpan = "col-span-2";
        rowSpan = "row-span-2";
      } else if (index === 1 || index === 4) {
        colSpan = "col-span-2";
        rowSpan = "row-span-1";
      } else {
        colSpan = "col-span-1";
        rowSpan = "row-span-1";
      }
    } else {
      // Para más de 6 elementos, usa un diseño con varias filas
      if (index % 4 === 0) {
        colSpan = "col-span-2";
        rowSpan = "row-span-2";
      } else if (index % 3 === 0) {
        colSpan = "col-span-2";
      } else {
        colSpan = "col-span-1";
        rowSpan = "row-span-1";
      }
    }

    return `${colSpan} ${rowSpan}`;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 grid-flow-dense gap-4 w-full mt-8">
      {featured.map((item, index) => (
        <FeatureNewCard
          key={item._id}
          data={item}
          span={getGridClasses(index, featured.length)}
        />
      ))}
    </div>
  );
};

export default FeaturedNews;
