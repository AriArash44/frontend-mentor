import ListIcon from "../../assets/images/icon-list.svg";

const ListItem = (props) => {
    return (
      <span>
        <img src={ListIcon} alt="*"/>
        <p className="ml-2 flex">{props.title}</p>
      </span>
    );
};

export default ListItem;