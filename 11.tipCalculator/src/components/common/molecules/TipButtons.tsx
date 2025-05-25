import { useState, useEffect } from "react";
import { Button } from "../atoms/button";

const TipCalculator = () => {
    const {tip, setTip} = useState(null);
    useEffect(() => {
        onTipChange(tip);
    }, [tip])
    return (
      <div className="grid grid-cols-3 grid-rows-2 gap-2">
        <Button variant="default">Button</Button>
        <Button variant="default">Button</Button>
        <Button variant="default">Button</Button>
        <Button variant="default">Button</Button>
        <Button variant="default">Button</Button>
        <Button variant="default">Button</Button>
      </div>
    );
};

export default TipCalculator;