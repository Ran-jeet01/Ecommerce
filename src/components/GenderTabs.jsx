const GenderTabs = ({ currentGender, setCurrentGender }) => {
  const genders = ["all", "male", "female", "unisex"];

  return (
    <div className="flex justify-center mt-4 sm:mt-6 gap-2 flex-wrap px-2 sm:px-0">
      {genders.map((gender) => (
        <button
          key={gender}
          onClick={() => setCurrentGender(gender)}
          className={`px-4 py-1 sm:px-6 sm:py-2 rounded-full border transition text-sm sm:text-base ${
            currentGender === gender
              ? "bg-blue-500 text-white border-blue-500"
              : "border-gray-300 hover:bg-gray-100"
          }`}
        >
          {gender.charAt(0).toUpperCase() + gender.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default GenderTabs;
