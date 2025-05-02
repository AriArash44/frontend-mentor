import { useCardsVisibility } from "../../hooks/useCardsVisibility";
import { cardsVisibilityActionType } from "../../types/cardsVisibilityActions";

interface CheckboxProps {
    name: string,
    index: number
}

const Checkbox = (props: CheckboxProps) => {
    const { cardsVisibilityState, dispatch } = useCardsVisibility();
    return (
        <span>
          <input className="mr-1 p-2" type="checkbox" id={props.name.split(" ")[0]} name="scales" onChange={() => 
               dispatch({ type: cardsVisibilityActionType.toggleCell, index: props.index })} checked={cardsVisibilityState[props.index]}/>
          <label className="text-sm md:text-base" htmlFor={props.name.split(" ")[0]}>{props.name}</label>
        </span>
    );
}

export default Checkbox