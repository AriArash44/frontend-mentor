import Layout from "../layouts/Layout";
import TipCalculator from "../common/molecules/TipButtons";
import useTipStore from "@/stores/tipStore";
import { Button } from "../common/atoms/button";
import tipCalculator from "@/utils/tipCalculator";
import { useEffect } from "react";

const Calculator = () => {
    const { tip, reset } = useTipStore();
    useEffect(() => {
        return (reset());
    }, [])
    return (
      <Layout>
        <Layout.Header>
          <h1 className="text-sm text-green-900 w-16 font-bold">S P L I T T E R</h1>
        </Layout.Header>
        <Layout.Main>
          <div>
            <TipCalculator />
          </div>
          <div>
            <Button variant="secondary" onClick={() => {tipCalculator(tip)}}/>
          </div>
        </Layout.Main>
      </Layout>
    );
};

export default Calculator;