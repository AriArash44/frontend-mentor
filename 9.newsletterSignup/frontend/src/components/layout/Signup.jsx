import React from "react";

const Figure = ({ children }) => <figure>{children}</figure>;
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
      <div dir="rtl" className="flex flex-col sm:flex-row bg-white sm:rounded-3xl center-content w-full signup-width gap-8">
        <div dir="ltr" className="w-full sm:w-1/2">
          <figure className="p-0 md:p-5">
              {figure}
          </figure>
        </div>
        <div dir="ltr" className="w-full sm:w-1/2 p-5">
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