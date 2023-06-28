import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

import StudentsFunctionComponent from "./Students";

export default function CrudFunctionComponent() {
  let navigate = useNavigate();
  const [showStudentTable, setShowStudentTable] = useState(true);

  const onAddStudentBtnClick = () => {
    navigate("/addstudent");
  };

  return (
    // Fragment tag and return only single parent tag
    <>
      <div className="row">
        <div className="col-1">
          <Link to="/">Go To Dashboard</Link>
        </div>
        <div className="col-11">
          <Button
            color="primary"
            onClick={() => {
              setShowStudentTable(!showStudentTable);
            }}
          >
            {showStudentTable ? "Hide Students" : "Show Students"}
          </Button>
        </div>
      </div>
      <br></br>
      <div>
        <StudentsFunctionComponent
          showStudentTable={showStudentTable}
          onAddStudentBtnClick={onAddStudentBtnClick}
        />
      </div>
    </>
  );
}
