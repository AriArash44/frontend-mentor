import { useContext } from "react";
import { TimeFrameContext } from "../../contexts/timeFrame";

interface ButtonProps {
    ButtonValue: "Daily" | "Weekly" | "Monthly";
}

const Button = (props: ButtonProps) => {
    const { dispatch } = useContext(TimeFrameContext)!;
    return (
      <button className="bg-white" 
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