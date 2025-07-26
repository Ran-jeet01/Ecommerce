const CategoryTabs = ({ currentCategory, changeCategory }) => {
  const categories = ["sunglasses", "watches", "shoes", "hoodies"];

  return (
    <div className="bg-gray-800 px-4 py-3  top-[4.5rem] z-40 shadow-md flex justify-start md:justify-center overflow-x-auto hide-scrollbar">
      <div className="flex space-x-2 min-w-max">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => changeCategory(category)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition whitespace-nowrap ${
              currentCategory === category
                ? "text-white bg-blue-500 font-semibold"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
