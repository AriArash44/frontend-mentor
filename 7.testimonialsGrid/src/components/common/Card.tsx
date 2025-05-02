import { graduateStatus } from "../../types/graduateStatus";
import { useCardsVisibility } from "../../hooks/useCardsVisibility";

interface CardProps {
    avatar: string,
    alt?: string,
    name: string,
    status: graduateStatus,
    header: string,
    caption: string,
    bgColor: string,
    primaryColor: string,
    secondaryColor: string,
    borderColor: string,
    qutation?: boolean,
    index: number
}

const Card = (props: CardProps) => {
    const { cardsVisibilityState } = useCardsVisibility();
    return (
      <section className={`bg-${props.bgColor} rounded-lg p-11 h-full custom-shadow relative ${cardsVisibilityState[props.index] ? "" : "invisible"}`}>
        {props.qutation ? <img className="absolute top-0 right-20 w-35" src="/images/bg-pattern-quotation.svg" alt=""/>: ""}
        <div className="flex align-end gap-5 relative z-10">
          <img className={`avatar border-${props.borderColor}`} src={props.avatar} alt={props.alt}/>
          <div>
            <h3 className={`text-${props.primaryColor} font-medium`}>{props.name}</h3>
            <p className={`text-${props.secondaryColor} font-medium`}>{props.status}</p>
          </div>
        </div>
        <h2 className={`text-${props.primaryColor} my-3 font-semibold relative z-10`}>{props.header}</h2>
        <p className={`text-${props.secondaryColor} font-medium`}>"{props.caption}"</p>
      </section>
    );
};

export default Card;