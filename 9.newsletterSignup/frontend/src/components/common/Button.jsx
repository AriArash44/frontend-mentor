const Button = (props) => {
    return (
      <input type="submit" value={props.text} className="rounded-xl bg-blue-800 text-white p-5 w-full mt-2" />
    );
};

export default Button;