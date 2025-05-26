import Layout from "../layouts/Layout";
import TipCalculator from "../common/molecules/TipButtons";
import useTipStore from "@/stores/tipStore";
import { Button } from "../common/atoms/button";
import tipCalculator from "@/utils/tipCalculator";
import { useEffect } from "react";
import { Input } from "../common/atoms/input";

const Calculator = () => {
    const { tip, reset } = useTipStore();
    useEffect(() => {
        return () => { 
            reset()
        };
    }, [])
    return (
      <Layout>
        <Layout.Header>
          <h1 className="text-base text-green-900 w-18 font-bold opacity-80">S P L I T T E R</h1>
        </Layout.Header>
        <Layout.Main>
          <div>
            <p>Bill</p>
            <Input icon="/images/icon-dollar.svg" />
            <p className="mt-4">Select Tip %</p>
            <TipCalculator />
            <p className="mt-4">Number of people</p>
            <Input icon="/images/icon-person.svg" />
          </div>
          <div className="bg-green-900 rounded-2xl p-6 flex flex-col justify-between">
            <div className="flex justify-between">
              <div>
                <p className="text-white">Tip Amount</p>
                <p className="text-gray-300 text-xs">/ person</p>
              </div>
              <h1 className="text-green-400 font-bold">$0.00</h1>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="text-white">Total</p>
                <p className="text-gray-300 text-xs">/ person</p>
              </div>
              <h1 className="text-green-400 font-bold">$0.00</h1>
            </div>
            <Button className="w-full" variant="secondary" onClick={() => {tipCalculator(tip!)}} disabled={!tip} >RESET</Button>
          </div>
        </Layout.Main>
      </Layout>
    );
};

export default Calculator;