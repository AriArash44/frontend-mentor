import { Button } from "../atoms/button";
import useTipStore from "@/stores/tipStore";
import { Input } from "../atoms/input";

const TipCalculator = () => {
    const { set } = useTipStore();
    return (
      <div className="grid grid-cols-3 grid-rows-2 gap-2">
        <Button variant="default" onClick={() => {set(5)}}>5%</Button>
        <Button variant="default" onClick={() => {set(10)}}>10%</Button>
        <Button variant="default" onClick={() => {set(15)}}>15%</Button>
        <Button variant="default" onClick={() => {set(25)}}>25%</Button>
        <Button variant="default" onClick={() => {set(50)}}>50%</Button>
        <Input onChange={(e) => {set(parseInt(e.target.value))}}></Input>
      </div>
    );
};

export default TipCalculator;