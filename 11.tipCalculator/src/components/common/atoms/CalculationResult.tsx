interface CalculationResultProps {
    title: string;
    res: number;
}

const CalculationResult = (props: CalculationResultProps) => {
    return (
      <div className="flex justify-between">
        <div>
          <p className="text-white">{props.title}</p>
          <p className="text-gray-300 text-xs">/ person</p>
        </div>
        <h1 className="text-green-400 font-bold">${props.res}</h1>
      </div>
    );
}

export default CalculationResult;