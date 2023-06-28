import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <ul>
      <li>
        <Link to="/">Dashboard</Link>
      </li>
      <li>
        <Link to="/importexport">Import/Export Component</Link>
      </li>
      <li>
        JSX
        <ul>
          <li>
            <Link to="/todolistfunction">JSX Function Component</Link>
          </li>
          <li>
            <Link to="/todolistclass">JSX Class Component</Link>
          </li>
        </ul>
      </li>

      <li>
        CRUD
        <ul>
          <li>
            <Link to="/studentsfunexample">Student Function Component</Link>
          </li>
          <li>
            <Link to="/studentsclassexample">Student Class Component</Link>
          </li>
        </ul>
      </li>
    </ul>
  );
}
