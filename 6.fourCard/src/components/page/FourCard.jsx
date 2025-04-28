import { MainLayout, Header, Body } from "../layout/Main.jsx";
import { Component } from "react";
import Card from "../common/Card.jsx";
import Cards from "../common/Cards.jsx";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { showToast } from "../../utils/showToastHandler.js";

export class FourCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [{
                id: "card1",
                color: "cyan",
                header: "Supervisor",
                caption: "Monitors activity to identify project roadblocks",
                image: "/images/icon-supervisor.svg",
            }, {
                id: "card2",
                color: "red",
                header: "Team Builder",
                caption: "Scans our talent network to create the optimal team for your project",
                image: "/images/icon-team-builder.svg",
            }, {
                id: "card3",
                color: "orange",
                header: "Karma",
                caption: "Regularly evaluates our talent to ensure quality",
                image: "/images/icon-karma.svg",
            }, {
                id: "card4",
                color: "blue",
                header: "Calculator",
                caption: "Uses data from past projects to provide better delivery estimates",
                image: "/images/icon-calculator.svg",
            }],
        };
        this.moveCard = this.moveCard.bind(this);
    }
    moveCard(draggedId, targetId) {
        const newCards = [...this.state.cards];
        const dragIndex = newCards.findIndex((card) => card.id === draggedId);
        const targetIndex = newCards.findIndex((card) => card.id === targetId);
        if (dragIndex === -1 || targetIndex === -1) return;
        [newCards[dragIndex], newCards[targetIndex]] = [
            newCards[targetIndex],
            newCards[dragIndex],
        ];
        this.setState({ cards: newCards });
    }
    componentDidUpdate(_prevProps, prevState) {
        if (prevState.cards !== this.state.cards) {
            showToast("Cards updated. New order: ".concat(this.state.cards.map(card => card.color).join(', ')));
        }
    }
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
              <DndProvider backend={HTML5Backend}>
                <Cards>
                {this.state.cards.map((card) => (
                  <Card key={card.id} {...card} moveCard={this.moveCard} />
                ))}
                </Cards>
              </DndProvider>
            </Body>
          </MainLayout>
        );
    }
}