import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

import { withRouter } from "../../../shared/WithRouter";
import StudentsComponent from "./Students";

class CrudComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showStudentTable: true,
    };
  }

  onAddStudentBtnClick = () => {
    this.props.navigate("/addstudent");
  };

  render() {
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
                this.setState({
                  showStudentTable: !this.state.showStudentTable,
                });
              }}
            >
              {this.state.showStudentTable ? "Hide Students" : "Show Students"}
            </Button>{" "}
            <Button color="primary" onClick={this.onAddStudentBtnClick}>
              Add Student
            </Button>
          </div>
        </div>
        <br></br>
        <div>
          <StudentsComponent showStudentTable={this.state.showStudentTable} />
        </div>
      </>
    );
  }
}

export default withRouter(CrudComponent);
