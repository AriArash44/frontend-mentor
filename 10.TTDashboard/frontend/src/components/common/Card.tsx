import { useContext } from "react";
import { TimeFrameContext } from "../../contexts/timeFrame";

interface CardProps {
    headImg: string;
    title: string;
    value: number;
    preValue: number;
}

const Card = (props: CardProps) => {
    const { timeFrame } = useContext(TimeFrameContext)!;
    return (
      <div className="rounded bg-navy-900">
        <img src={`/images/icon-${props.headImg}.svg`} alt=""/>
        <div className="flex justify-around">
          <h2 className="text-white">{props.title}</h2>
          <button className="">...</button>
        </div>
        <h1>{props.value}hrs</h1>
        <p>Last {timeFrame.timeFrame} - {props.preValue}hrs</p>
      </div>
    );
}

export default Card;