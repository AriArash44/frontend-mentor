import React from "react";

const Figure = ({ children }) => <figure>{children}</figure>;
const Header = ({ children }) => <>{children}</>;
const Main = ({ children }) => <>{children}</>;

const ResultLayput = (({children}) => {
    let header, main;
    React.Children.forEach(children, child => {
        if (React.isValidElement(child)) {
            if (React.isValidElement(child)) {
                if (child.type === Header) header = child;
                if (child.type === Main) main = child;
            }
        }
    });
    return (
      <div>
        <header>{header}</header>
        <main>{main}</main>
      </div>
    );
});


ResultLayput.Figure = Figure;
ResultLayput.Header = Header;
ResultLayput.Main = Main;

export default ResultLayput;