export const Navbar = () => {
  return (
    <div className={`flex py-4 justify-center items-center bg-white`}>
      <div className="flex flex-col items-center">
        <h1 className="text-5xl font-thin">
          <span className="text-primary font-semibold">IA</span> news
        </h1>
        <h1 className="text-2xl">AI-generated news</h1>
      </div>
    </div>
  );
};

export default Navbar;
