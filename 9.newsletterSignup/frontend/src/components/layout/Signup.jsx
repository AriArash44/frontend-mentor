import React from "react";

const Figure = ({ children }) => <>{children}</>;
const Header = ({ children }) => <>{children}</>;
const Main = ({ children }) => <>{children}</>;

const SignupLayout = ({children}) => {
    let figure, header, main;
    React.Children.forEach(children, child => {
        if (React.isValidElement(child)) {
            if (React.isValidElement(child)) {
                if (child.type === Figure) figure = child;
                if (child.type === Header) header = child;
                if (child.type === Main) main = child;
            }
        }
    });
    return ( 
      <div dir="rtl" className="flex flex-col sm:flex-row justify-center items-center
      bg-white sm:rounded-3xl w-full sm:w-[48rem] h-full sm:h-auto sm:shadow-2xl">
        <div dir="ltr" className="w-full h-full sm:w-1/2">
          <figure className="p-0 w-full sm:p-5">
              {figure}
          </figure>
        </div> 
        <div dir="ltr" className="w-full sm:w-1/2 p-5 sm:p-10 sm:pr-5">
          <header>{header}</header>
          <main>{main}</main>
        </div>
      </div>
    );
};

SignupLayout.Figure = Figure;
SignupLayout.Header = Header;
SignupLayout.Main = Main;

export default SignupLayout;