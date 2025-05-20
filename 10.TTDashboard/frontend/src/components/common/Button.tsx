import { useContext } from "react";
import { TimeFrameContext } from "../../contexts/timeFrame";

interface ButtonProps {
    ButtonValue: "Daily" | "Weekly" | "Monthly";
}

const Button = (props: ButtonProps) => {
    const { timeFrame ,dispatch } = useContext(TimeFrameContext)!;
    return (
      <button type="button" className={`${timeFrame.timeFrame === props.ButtonValue ? "text-white" : "text-purple-500"}
         hover:text-white hover:cursor-pointer text-left py-2`}
      onClick = {() => {
          dispatch({
              type: "SET_TIMEFRAME",
              payload: props.ButtonValue
          })
      }}>
        { props.ButtonValue }
      </button>
    );
}

export default Button;