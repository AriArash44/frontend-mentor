import React from "react";

const Header = ({ children }) => <>{children}</>;
const Main = ({ children }) => <>{children}</>;

const ResultLayout = (({children}) => {
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
      <div className="flex flex-col justify-center items-center p-10
      bg-white sm:rounded-3xl w-full sm:w-[30rem] h-screen sm:h-auto sm:gap-8">
        <header className="w-full">{header}</header>
        <main className="mt-8 sm:mt-2">{main}</main>
      </div>
    );
});

ResultLayout.Header = Header;
ResultLayout.Main = Main;

export default ResultLayout;