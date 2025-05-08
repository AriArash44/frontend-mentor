import ListIcon from "../../assets/images/icon-list.svg";

const ListItem = (props) => {
    return (
      <div className="flex gap-2 items-start mt-2">
        <img src={ListIcon} alt="*"/>
        <p>{props.title}</p>
      </div>
    );
};

export default ListItem;