import React, { Component } from "react";

export class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHovered: false,
        };
    }
    render() {
        return (
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
        );
    }
}

export class Cards extends Component {
    render() {
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-4 gap-8 justify-items-center max-w-[1114px] m-auto mt-15 mb-15">
            {React.Children.map(this.props.children, (child, index) => (
              <div className={`md:row-start-${((2 * index + 1) % 3) + 1} md:row-span-2 md:col-start-${Math.floor((2 * index + 1) / 3) + 1}`}>
                {child}
              </div>
            ))}
          </div>
        );
    }
}