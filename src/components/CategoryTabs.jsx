const CategoryTabs = ({ currentCategory, changeCategory }) => {
  const categories = ["sunglasses", "watches", "shoes", "hoodies", "combo"];

  return (
    <div className="bg-gray-800 px-5 py-3 sticky top-16 z-40 shadow flex justify-center gap-4 overflow-x-auto">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => changeCategory(category)}
          className={`px-4 py-2 rounded-full text-white transition ${
            currentCategory === category
              ? "bg-blue-500"
              : "bg-opacity-10 hover:bg-opacity-20"
          }`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
