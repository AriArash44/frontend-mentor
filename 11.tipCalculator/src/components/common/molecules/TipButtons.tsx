import { Button } from "../atoms/button";
import useTipStore from "@/stores/tipStore";
import { Input } from "../atoms/input";
import { useEffect, useState } from "react";

interface TipButtonsProps { 
    toggleReset: boolean;
}

const TipButtons = (props: TipButtonsProps) => {
    const { set } = useTipStore();
    const [selectedItem, setSelectedItem] = useState(0);
    const [customTip, setCustomTip] = useState("");
    useEffect(() => {
        setSelectedItem(0);
        setCustomTip("");
    }, [props.toggleReset]);
    const tips = [5, 10, 15, 25, 50];
    return (
      <div className="grid grid-cols-3 grid-rows-2 gap-3 mt-3">
        {tips.map((tip, i) => (
          <Button key={tip} variant={selectedItem === i + 1 ? "secondary" : "default"} onClick={() => {set(tip); setCustomTip(""); setSelectedItem(i + 1);}}>{tip}%</Button>
        ))}
        <Input className="text-lg" placeholder="Custom" value={customTip} validMax={100} onChange={(e) => {set(parseInt(e.target.value)); setCustomTip(e.target.value); setSelectedItem(0)}} />
      </div>
    );
};

export default TipButtons;