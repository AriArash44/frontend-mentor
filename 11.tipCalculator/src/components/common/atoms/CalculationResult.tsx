function formatNumber(value: number): string {
    return value.toFixed(2);
}

interface CalculationResultProps {
    title: string;
    res: number;
}

const CalculationResult = (props: CalculationResultProps) => {
    return (
      <div className="flex justify-between mt-2 mb-6 items-center">
        <div>
          <p className="text-white text-sm font-bold">{props.title}</p>
          <p className="text-gray-400 text-xs font-bold">/ person</p>
        </div>
        <h1 className="text-green-400 font-bold">${formatNumber(props.res)}</h1>
      </div>
    );
}

export default CalculationResult;