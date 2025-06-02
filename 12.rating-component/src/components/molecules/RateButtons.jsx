import { useState } from "react";
import RateButton from "../atoms/RateButton";

const RateButtons = ({ onRateChange }) => {
    const [rate, setRate] = useState(0);
    const handleButtonClick = (value) => {
        setRate(value);
        onRateChange(value);
    };
    return (
      <div className="flex justify-center gap-3">
        {[1, 2, 3, 4, 5].map((rateValue) => (
            <RateButton 
              key={rateValue}
              text={rateValue} 
              isActive={rateValue === rate}
              onClick={() => handleButtonClick(rateValue)}
            />
        ))}
      </div>
    );
};

export default RateButtons;
