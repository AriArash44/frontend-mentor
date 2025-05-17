import Button from "./Button";

interface ProfCardProps {
    profImg: string;
    username: string;
}

const ProfCard = (props: ProfCardProps) => {
    return (
      <div className="bg-navy-900 rounded-xl h-full">
        <div className="bg-purple-600 rounded-xl p-6">
          <img className="rounded-full w-16 h-16 border-white border-3" src={props.profImg} alt="" />
          <p className="text-navy-200 mt-8 font-light">Report for</p>
          <h1 className="text-white font-light">{props.username}</h1>
        </div>
        <div className="flex flex-row justify-between md:flex-col p-6">
          <Button ButtonValue="Daily"></Button>
          <Button ButtonValue="Weekly"></Button>
          <Button ButtonValue="Monthly"></Button>
        </div>
      </div>
    );
}

export default ProfCard;