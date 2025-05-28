import Layout from "../layouts/Layout";
import TipButtons from "../common/molecules/TipButtons";
import useTipStore from "@/stores/tipStore";
import tipCalculator from "@/utils/tipCalculator";
import { useState, useEffect } from "react";
import { Input } from "../common/atoms/input";
import { Button } from "../common/atoms/button";
import CalculationResult from "../common/atoms/CalculationResult";

const Calculator = () => {
    const [toggleReset, setToggleReset] = useState(false);
    const [bill, setBill] = useState("");
    const [people, setPeople] = useState("");
    const { tip, reset } = useTipStore();
    const [{ tipPerPerson, totalPerPerson }, setResult] = useState({ tipPerPerson: 0, totalPerPerson: 0, success: false})
    useEffect(() => {
        return () => { 
            reset();
        };
    }, [reset]);
    useEffect(() => {
        if(parseInt(bill) && parseInt(people)) {
            setResult(tipCalculator(parseInt(bill), tip, parseInt(people)));
        }
    }, [bill, tip, people]);
    return (
      <Layout>
        <Layout.Header>
          <h1 className="text-base text-green-900 w-18 font-bold opacity-80">S P L I T T E R</h1>
        </Layout.Header>
        <Layout.Main>
          <div>
            <p>Bill</p>
            <Input icon="/images/icon-dollar.svg" value={bill} onChange={(e) => setBill(e.target.value)} placeholder="0" allowDecimal={true}/>
            <p className="mt-4">Select Tip %</p>
            <TipButtons toggleReset={toggleReset} />
            <div className="flex justify-between mt-4">
              <p className="">Number of people</p>
              {people === "0" && <p className="text-red-400">Can't be zero</p>}
            </div>
            <Input icon="/images/icon-person.svg" validMin={1} value={people} onChange={(e) => setPeople(e.target.value)} placeholder="0" />
          </div>
          <div className="bg-green-900 rounded-2xl p-6 flex flex-col justify-between">
            <CalculationResult title="Tip Amount" res={tipPerPerson} />
            <CalculationResult title="Total" res={totalPerPerson} />
            <Button className="w-full" variant="secondary" disabled={!tip && !bill && !people} 
            onClick={() => {
                setBill("");
                setPeople("");
                setResult({ tipPerPerson: 0, totalPerPerson: 0, success: false});
                reset();
                setToggleReset(toggleReset => !toggleReset);
            }}>RESET</Button>
          </div>
        </Layout.Main>
      </Layout>
    );
};

export default Calculator;