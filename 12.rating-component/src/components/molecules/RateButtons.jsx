import RateButton from "../atoms/RateButton";

const RateButtons = ({ rating, onRateChange }) => {
  return (
    <div role="radiogroup" aria-label="Rating options" className="flex justify-between gap-3 w-full">
      {[1, 2, 3, 4, 5].map((rateValue) => (
        <RateButton 
          key={rateValue}
          text={rateValue} 
          isActive={rateValue === rating}
          onClick={() => onRateChange(rateValue)}
        />
      ))}
    </div>
  );
};

export default RateButtons;