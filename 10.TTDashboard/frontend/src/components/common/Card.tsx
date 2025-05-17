import { useContext, useEffect, useRef, useState } from "react";
import { TimeFrameContext } from "../../contexts/timeFrame";
import { titleColorMapper } from "../../utils/titleColorMapper";

interface CardProps {
    headImg: string;
    title: string;
    value: number;
    preValue: number;
}

const Card = (props: CardProps) => {
    const { timeFrame } = useContext(TimeFrameContext)!;
    const prevValueRef = useRef<number>(props.value);
    const [flashClass, setFlashClass] = useState<string>("");
    useEffect(() => {
        if (prevValueRef.current < props.value) {
            setFlashClass("text-green-500");
        } else if (prevValueRef.current > props.value) {
            setFlashClass("text-red-500");
        } else {
            setFlashClass("");
        }
        prevValueRef.current = props.value;
        const timer = setTimeout(() => {
            setFlashClass("");
        }, 500);
        return () => clearTimeout(timer);
    }, [props.value]);
    return (
      <div className={`flex flex-col justify-end relative overflow-clip rounded-xl bg-${titleColorMapper(props.title)}`}>
        <img className="absolute -top-2 right-3" src={`/images/icon-${props.headImg}.svg`} alt=""/>
        <div className="rounded-xl bg-navy-900 h-4/5 relative z-10 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-white font-medium">{props.title}</h2>
            <img className="h-1 cursor-pointer" src="/images/icon-ellipsis.svg" alt=""/>
          </div>
          <h1 className="mt-5 text-white font-light"><span className={flashClass}>{props.value}</span>hrs</h1>
          <p className="text-navy-200 font-light">Last {timeFrame.timeFrame} - {props.preValue}hrs</p>
        </div>
      </div>
    );
}

export default Card;