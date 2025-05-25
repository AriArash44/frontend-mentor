import React from "react";

interface LayoutProps {
    children: React.ReactNode;
}

interface CompoundChildProps {
    children: React.ReactNode;
}

const Header: React.FC<CompoundChildProps> = ({ children }) => <>{children}</>;
Header.displayName = "Layout.Header";

const Main: React.FC<CompoundChildProps> = ({ children }) => <>{children}</>;
Main.displayName = "Layout.Main";

type LayoutComponent = React.FC<LayoutProps> & {
    Header: typeof Header;
    Main: typeof Main;
};

const Layout: LayoutComponent = ({ children }) => {
    let header: React.ReactElement | undefined;
    let main: React.ReactElement | undefined;
    React.Children.forEach(children, child => {
        if (React.isValidElement(child)) {
            if (child.type && (child.type as any).displayName === "Layout.Header") {
                header = child;
            }
            if (child.type && (child.type as any).displayName === "Layout.Main") {
                main = child;
            }
        }
    });
    return (
      <div className="flex flex-col justify-center items-center min-h-screen w-screen bg-gray-200">
        <header>
          {header}
        </header>
        <main className="grid gap-6 grid-cols-1 sm:grid-cols-2 bg-white w-full 
          rounded-t-2xl sm:w-[40rem] sm:rounded-2xl p-6">
          {main}
        </main>
      </div>
    );
};

Layout.Header = Header;
Layout.Main = Main;

export default Layout;