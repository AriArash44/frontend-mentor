import Button from "./Button";

interface ProfCardProps {
    profImg: string;
    username: string;
}

const ProfCard = (props: ProfCardProps) => {
    return (
      <div className="bg-navy-900 rounded-xl h-full">
        <div className="flex gap-5 items-center md:block bg-purple-600 rounded-xl p-8">
          <img className="rounded-full w-20 h-20 border-white border-3" src={props.profImg} alt="" />
          <div>
            <p className="text-navy-200 md:mt-8 font-light">Report for</p>
            <h1 className="text-white font-light md:mb-10">{props.username}</h1>
          </div>
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