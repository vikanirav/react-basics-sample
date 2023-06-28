import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

export default class TodoListClassComponent extends PureComponent {
  person = {
    name: "Nirav",
    theme: {
      backgroundColor: "gray",
      color: "pink",
    },
  };

  getTodoList = () => {
    return (
      // added style using {} to attribute
      <div style={this.person.theme}>
        {/* camelCase attributes & pass a string attribute to JSX  */}
        <img
          className="snplogo"
          src="https://www.spglobal.com/_media/images/logo-spglobal.svg"
          alt="S & P Logo"
        />
        {/* style added in double {} */}
        <ul
          style={{
            fontSize: 20,
          }}
        >
          <li>Go to swimming class</li>
          <li>Start office work</li>
        </ul>
      </div>
    );
  };

  render() {
    return (
      // Fragment tag and return only single parent tag
      <>
        <div>
          <Link to="/">Go To Dashboard</Link>
        </div>
        <div>
          {/* added value using {} */}
          <h1>{this.person.name}'s Todos</h1>

          {/* invoke function */}
          {this.getTodoList()}
        </div>
      </>
    );
  }
}
