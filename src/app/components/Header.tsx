import React, { Component } from "react";

class Header extends Component {

  render() {
    return (
      <header>
        <div>
          {this.props.header}
          <h1>{this.props.title}</h1>
        </div>
      </header>
    )
  }
}

export default Header;
