import { Link } from "react-router-dom";

export default function TodoListFunctionComponent() {
  const person = {
    name: "Nirav",
    theme: {
      backgroundColor: "black",
      color: "pink",
    },
  };

  const getTodoList = () => {
    return (
      // added style using {} to attribute
      <div style={person.theme}>
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

  return (
    // Fragment tag and return only single parent tag
    <>
      <div>
        <Link to="/">Go To Dashboard</Link>
      </div>
      <div>
        {/* added value using {} */}
        <h1>{person.name}'s Todos</h1>

        {/* invoke function */}
        {getTodoList()}
      </div>
    </>
  );
}
