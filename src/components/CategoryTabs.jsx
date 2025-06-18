const CategoryTabs = ({ currentCategory, changeCategory }) => {
  const categories = ["sunglasses", "watches", "shoes", "hoodies", "combo"];

  return (
    <div className="bg-gray-800 px-4 py-3 sticky top-16 z-40 shadow flex justify-start md:justify-center overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="flex space-x-2 min-w-max">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => changeCategory(category)}
            className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-white text-sm sm:text-base transition whitespace-nowrap ${
              currentCategory === category
                ? "bg-blue-500"
                : "bg-gray-700 hover:bg-gray-600"
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
