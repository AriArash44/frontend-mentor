const RateButton = ({ text, isActive, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Rate ${text}`}
      aria-pressed={isActive}
      className={`rounded-full p-3 hover:bg-white hover:text-gray-950 w-12 h-12 cursor-pointer font-bold
        ${isActive ? "bg-orange-500 text-gray-950" : "bg-gray-500/25 text-grey-200"}`}
    >
      {text}
    </button>
  );
};

export default RateButton;
