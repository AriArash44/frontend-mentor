import { graduateStatus } from "../../types/graduateStatus";

interface CardProps {
    avatar: string,
    alt?: string,
    name: string,
    status: graduateStatus,
    header: string,
    caption: string,
    bgColor: string,
    primaryColor: string,
    secondaryColor: string
}

const Card = (props: CardProps) => {
    return (
      <section className={`bg-${props.bgColor} rounded-lg p-7 h-full`}>
        <div className="flex gap-5">
          <img className="avatar" src={props.avatar} alt={props.alt}/>
          <div>
            <h3 className={`text-${props.primaryColor}`}>{props.name}</h3>
            <p className={`text-${props.secondaryColor}`}>{props.status}</p>
          </div>
        </div>
        <h2 className={`text-${props.primaryColor} my-3`}>{props.header}</h2>
        <p className={`text-${props.secondaryColor}`}>"{props.caption}"</p>
      </section>
    );
};

export default Card;