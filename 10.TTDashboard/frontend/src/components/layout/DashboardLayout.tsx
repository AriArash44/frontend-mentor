import React from "react";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

interface CompoundChildProps {
    children: React.ReactNode;
}

const Header: React.FC<CompoundChildProps> = ({ children }) => <>{children}</>;
Header.displayName = "DashboardLayout.Header";

const Main: React.FC<CompoundChildProps> = ({ children }) => <>{children}</>;
Main.displayName = "DashboardLayout.Main";

type DashboardLayoutComponent = React.FC<DashboardLayoutProps> & {
    Header: typeof Header;
    Main: typeof Main;
};

const DashboardLayout: DashboardLayoutComponent = ({ children }) => {
    let header: React.ReactElement | undefined;
    let main: React.ReactElement | undefined;
    React.Children.forEach(children, child => {
        if (React.isValidElement(child)) {
            if (child.type && (child.type as any).displayName === "DashboardLayout.Header") {
                header = child;
            }
            if (child.type && (child.type as any).displayName === "DashboardLayout.Main") {
                main = child;
            }
        }
    });
    return (
      <div className="flex flex-col justify-center items-center min-h-screen w-screen bg-navy-950">
        <header>
          {header}
        </header>
        <main className="grid gap-6 grid-cols-1 my-20 md:grid-cols-4 grid-rows-7 md:grid-rows-2 w-11/12 lg:w-[1000px]">
          {main}
        </main>
      </div>
    );
};

DashboardLayout.Header = Header;
DashboardLayout.Main = Main;

export default DashboardLayout;