import Button from "./Button";

interface ProfCardProps {
    profImg: Blob;
    username: string;
}

const ProfCard = (props: ProfCardProps) => {
    return (
      <div>
        <div>
          <img className="rounded-full" src={props.profImg} alt="" />
          <p>Report for</p>
          <h1>{props.username}</h1>
        </div>
        <div className="flex flex-col md:flex-row">
          <Button ButtonValue="Daily"></Button>
          <Button ButtonValue="Weekly"></Button>
          <Button ButtonValue="Monthly"></Button>
        </div>
      </div>
    );
}

export default ProfCard;