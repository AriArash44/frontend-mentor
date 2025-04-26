import { MainLayout, Header, Body } from "../layout/Main.jsx";
import { Component } from "react";
import { Card } from "../common/Cards.jsx";

export class FourCard extends Component {
    render() {
        return (
          <MainLayout>
            <Header>
              <div className="flex flex-col justify-center text-center">
                <h1 className="font-extralight lg:text-3xl text-gray-500 dark:text-gray-200">Reliable, efficient delivery</h1>
                <h2 className="font-semibold lg:text-3xl text-gray-600 mt-1 dark:text-gray-100">Powered by Technology</h2>
                <section className="sm:w-4/5 lg:w-3/5 m-auto">
                  <p className="font-normal mt-5 text-gray-400 dark:text-gray-300">Our Artificial Intelligence powered tools use millions of project data points to ensure that your project is successful </p>
                </section>
              </div>
            </Header>
            <Body>
              <Card color="cyan" header="Supervisor" caption="Monitors activity to identify project roadblocks" image="/images/icon-supervisor.svg"/>
              <Card color="red" header="Team Builder" caption="Scans our talent network to create the optimal team for your project" image="/images/icon-team-builder.svg"/>
              <Card color="blue" header="Karma" caption="Regularly evaluates our talent to ensure quality" image="/images/icon-karma.svg"/>
              <Card color="orange" header="Calculator" caption="Uses data from past projects to provide better delivery estimates" image="/images/icon-calculator.svg"/>
            </Body>
          </MainLayout>
        );
    }
}