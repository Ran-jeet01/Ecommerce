const GenderTabs = ({ currentGender, setCurrentGender }) => {
  const genders = ["all", "male", "female", "unisex"];

  return (
    <div className="flex justify-center mt-6 gap-2 flex-wrap">
      {genders.map((gender) => (
        <button
          key={gender}
          onClick={() => setCurrentGender(gender)}
          className={`px-6 py-2 rounded-full border transition ${
            currentGender === gender
              ? "bg-blue-500 text-white border-blue-500"
              : "border-gray-300"
          }`}
        >
          {gender.charAt(0).toUpperCase() + gender.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default GenderTabs;
