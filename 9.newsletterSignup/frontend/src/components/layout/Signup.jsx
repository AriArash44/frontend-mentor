import React from "react";

const Figure = ({ children }) => <>{children}</>;
const Header = ({ children }) => <>{children}</>;
const Main = ({ children }) => <>{children}</>;
const Footer = ({ children }) => <>{children}</>;

const SignupLayout = ({children}) => {
    React.Children.forEach(children, child => {
        if (React.isValidElement(child)) {
            if (child.type === Figure) figure = child;
            if (child.type === Header) header = child;
            if (child.type === Main) main = child;
            if (child.type === Footer) footer = child;
        }
    });
    return (
        <div>
          <div>
            <figure>
                
            </figure>
          </div>
          <div>
            <header></header>
            <main></main>
            <footer></footer>
          </div>
        </div>
    );
};

export default SignupLayout;