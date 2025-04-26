import React, { Component } from 'react';

export class Header extends Component {
    render() {
        return this.props.children;
    }
}

export class Body extends Component {
    render() {
        return this.props.children;
    }
}

export class MainLayout extends Component {
    render() {
        let header, body;
        React.Children.forEach(this.props.children, (child) => {
            if (child.type === Header) header = child;
            else if (child.type === Body) body = child;
        });

        return (
            <>
              <header className="header flex justify-center align-center mt-8 lg:mt-12">{header}</header>
              <main className="body">{body}</main>
            </>
        );
    }
}