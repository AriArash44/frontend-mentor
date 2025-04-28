import React, { Component, createRef } from "react";
import { DropTarget } from "react-dnd";

const containerDropTarget = {
    drop(props, monitor, component) {
        const clientOffset = monitor.getClientOffset();
        if (!clientOffset || !component) {
            return;
        }
        let targetIndex = null;
        for (let i = 0; i < component.cardRefs.length; i++) {
            const ref = component.cardRefs[i];
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                if (
                    clientOffset.x >= rect.left &&
                    clientOffset.x <= rect.right &&
                    clientOffset.y >= rect.top &&
                    clientOffset.y <= rect.bottom
                ) {
                    targetIndex = i;
                    break;
                }
            }
        }
        if (targetIndex === null) {
            return;
        }
        const draggedItem = monitor.getItem();
        const childrenArray = React.Children.toArray(props.children);
        const targetCard = childrenArray[targetIndex];
        if (draggedItem.id === targetCard.props.id) {
            return;
        }
        if (typeof props.moveCard === "function") {
            props.moveCard(draggedItem.id, targetCard.props.id);
        }
    }
};

function containerDropCollect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

class Cards extends Component {
    constructor(props) {
        super(props);
        this.cardRefs = React.Children.map(this.props.children, () => createRef());
    }  
    render() {
        return this.props.connectDropTarget(
          <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-4 gap-8 justify-items-center max-w-[1114px] m-auto mt-15 mb-15">
            {React.Children.map(this.props.children, (child, index) => (
            <div 
                ref={this.cardRefs[index]} 
                className={`md:row-start-${((2 * index + 1) % 3) + 1} md:row-span-2 md:col-start-${Math.floor((2 * index + 1) / 3) + 1}`}
            >
              {child}
            </div>
            ))}
          </div>
        );
    }
}

// eslint-disable-next-line react-refresh/only-export-components
export default DropTarget("card", containerDropTarget, containerDropCollect)(Cards);