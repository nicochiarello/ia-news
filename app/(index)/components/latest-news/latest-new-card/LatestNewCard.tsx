const LatestNewCard = () => {
  const body = ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga eaque
        dolores ad amet deleniti sed dicta, accusantium error quae itaque minus
        eos et, quidem ratione, eveniet beatae quos cumque ipsa! Nemo quia
        dignissimos sunt iusto accusantium debitis rem nostrum modi.`;
  return (
    <div className="flex flex-col w-full h-[28rem] justify-between cursor-pointer hover:shadow-lg">
      <div className="w-full h-[50%] bg-blue-200 relative">
        <img
          className="w-full h-full object-cover"
          src="https://via.placeholder.com/300"
          alt="latest new"
        />
        <div className="w-[85%] p-2 bg-gray-200 absolute bottom-0 left-0 translate-y-[60%]">
          <p className="font-semibold text-2xl truncate">
            Este es el titulo de la nota
          </p>
          <p className="hidden md:block truncate">Esta es la descripcion de la nota</p>
          <div className="w-[40%] h-[1.5px] bg-primary mt-4"></div>
        </div>
      </div>
      <div className="p-2 mt-[3.5rem] flex-1">
        <p className="truncate-4-lines">{body}</p>
      </div>

      <div className="py-4 px-2">
        <p className="text-primary">Category</p>
      </div>
    </div>
  );
};

export default LatestNewCard;
