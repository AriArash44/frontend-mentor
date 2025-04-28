import React, { Component } from "react";
import { DragSource, DropTarget } from "react-dnd";

const ItemTypes = {
    CARD: 'card'
}

const cardDragSource = {
    beginDrag(props) {
        return { id: props.id };
    }
}

const cardDragCollect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

const cardDropTarget = {
    drop(props, monitor) {
        const draggedItem = monitor.getItem();
        if (draggedItem.id !== props.id && typeof props.moveCard === "function") {
            props.moveCard(draggedItem.id, props.id);
        }
    }    
}

function cardDropCollect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    }
}

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHovered: false,
        };
    }
    render() {
        return this.props.connectDragSource(this.props.connectDropTarget(
            <div className={(this.state.isHovered ? `custom-${this.props.color}-shadow` : `custom-black-shadow`).
                concat(` dark:bg-gray-200 max-w-[350px] rounded p-6 border-t-4 border-custom-${this.props.color}`)}
            onMouseEnter={() => this.setState({ isHovered: true })}
            onMouseLeave={() => this.setState({ isHovered: false })}>
              <h3 className="text-gray-600 font-semibold">{this.props.header}</h3>
              <p className="text-gray-400 text-sm mt-2.5 leading-relaxed">{this.props.caption}</p>
              <div className="flex justify-end">
                <img className="mt-10" loading="lazy" src={this.props.image} alt=""/>
              </div>
            </div>
        ));
    }
}

// eslint-disable-next-line react-refresh/only-export-components
export default DropTarget(ItemTypes.CARD, cardDropTarget, cardDropCollect)(DragSource(ItemTypes.CARD, cardDragSource, cardDragCollect)(Card));