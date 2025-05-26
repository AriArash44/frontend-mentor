import { Button } from "../atoms/button";
import useTipStore from "@/stores/tipStore";
import { Input } from "../atoms/input";
import { useEffect, useState } from "react";

interface TipCalculatorProps { 
    toggleReset: boolean;
}

const TipCalculator = (props: TipCalculatorProps) => {
    const { set } = useTipStore();
    const [selectedItem, setSelectedItem] = useState(0);
    const [customTip, setCustomTip] = useState("");
    useEffect(() => {
        setSelectedItem(0);
        setCustomTip("");
    }, [props.toggleReset])
    return (
      <div className="grid grid-cols-3 grid-rows-2 gap-3">
        <Button variant={selectedItem === 1 ? "secondary" : "default"} onClick={() => {set(5);setCustomTip(""); setSelectedItem(1)}}>5%</Button>
        <Button variant={selectedItem === 2 ? "secondary" : "default"} onClick={() => {set(10);setCustomTip(""); setSelectedItem(2)}}>10%</Button>
        <Button variant={selectedItem === 3 ? "secondary" : "default"} onClick={() => {set(15);setCustomTip(""); setSelectedItem(3)}}>15%</Button>
        <Button variant={selectedItem === 4 ? "secondary" : "default"} onClick={() => {set(25);setCustomTip(""); setSelectedItem(4)}}>25%</Button>
        <Button variant={selectedItem === 5 ? "secondary" : "default"} onClick={() => {set(50);setCustomTip(""); setSelectedItem(5)}}>50%</Button>
        <Input placeholder="Custom" value={customTip}  onChange={(e) => {setCustomTip(e.target.value); set(parseInt(e.target.value)); setSelectedItem(0)}} />
      </div>
    );
};

export default TipCalculator;