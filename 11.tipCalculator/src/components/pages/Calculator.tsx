import Layout from "../layouts/Layout";
import TipCalculator from "../common/molecules/TipButtons";
import useTipStore from "@/stores/tipStore";
import { Button } from "../common/atoms/button";
import tipCalculator from "@/utils/tipCalculator";
import { useState, useEffect } from "react";
import { Input } from "../common/atoms/input";

const Calculator = () => {
    const [toggleReset, setToggleReset] = useState(false);
    const [bill, setBill] = useState("");
    const [people, setPeople] = useState("");
    const [{ tipPerPerson, totalPerPerson }, setResult] = useState({ tipPerPerson: 0, totalPerPerson: 0, success: false})
    const { tip, reset } = useTipStore();
    useEffect(() => {
        return () => { 
            reset()
        };
    }, []);
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
            <TipCalculator toggleReset={toggleReset} />
            <div className="flex justify-between mt-4">
              <p className="">Number of people</p>
              {people === "0" && <p className="text-red-400">Can't be zero</p>}
            </div>
            <Input icon="/images/icon-person.svg" validMin={1} value={people} onChange={(e) => setPeople(e.target.value)} placeholder="0" />
          </div>
          <div className="bg-green-900 rounded-2xl p-6 flex flex-col justify-between">
            <div className="flex justify-between">
              <div>
                <p className="text-white">Tip Amount</p>
                <p className="text-gray-300 text-xs">/ person</p>
              </div>
              <h1 className="text-green-400 font-bold">${tipPerPerson}</h1>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="text-white">Total</p>
                <p className="text-gray-300 text-xs">/ person</p>
              </div>
              <h1 className="text-green-400 font-bold">${totalPerPerson}</h1>
            </div>
            <Button className="w-full" variant="secondary" disabled={!tip && !bill && !people} 
            onClick={() => {
                setBill("");
                setPeople("");
                setResult({ tipPerPerson: 0, totalPerPerson: 0, success: false});
                reset();
                setToggleReset(!toggleReset);
            }}>RESET</Button>
          </div>
        </Layout.Main>
      </Layout>
    );
};

export default Calculator;