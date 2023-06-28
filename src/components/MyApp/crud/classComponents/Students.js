import React, { PureComponent } from "react";
import { Button, Table } from "reactstrap";

import { httpService } from "../../../../services/http.service";
import { withRouter } from "../../../shared/WithRouter";

class StudentsComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      students: [],
      studentColumns: [],
      totalStudentCount: 0,
    };
  }

  //Component life cycle
  async componentDidMount() {
    document.addEventListener("keyup", this.handleKeyUp);
    await this.fetchStudents();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.showStudentTable !== this.props.showStudentTable) {
      // debugger;
    }

    if (
      prevState.students !== this.state.students &&
      this.state.students.length > 0
    ) {
      // debugger;
      // this.setState({ totalStudentCount: this.state.students.length });
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.handleKeyUp);
  }

  //Functions
  handleKeyUp = (event) => {
    const isAltKey =
      event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey;
    if (!isAltKey) return;
    switch (event.key.toLowerCase()) {
      case "a":
        this.onAddStaticEntryBtnClick();
        break;
      default:
        break;
    }
  };

  fetchStudents = async () => {
    const studentsResponse = await httpService.Get(`Students`);

    const cols = Object.keys(studentsResponse[0]);

    this.setState(
      {
        students: studentsResponse,
        studentColumns: [...cols, "fullName", "action"],
      },
      () => {
        this.setState({ totalStudentCount: this.state.students.length });
      }
    );
  };

  bindStudentsData = () => {
    return this.state.students.map((data, index) => {
      return (
        <tr key={`row${index}`}>
          {this.state.studentColumns.map((col, index) => {
            if (col === "fullName") {
              return (
                <td
                  key={`${col}${index}`}
                >{`${data["firstName"]} ${data["lastName"]}`}</td>
              );
            } else if (col === "action") {
              return (
                <td key={`${col}${index}`}>
                  <Button
                    color="link"
                    onClick={() => {
                      this.onEditStudentBtnClick(data);
                    }}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    color="link"
                    onClick={() => {
                      this.onDeleteStudentBtnClick(data);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              );
            } else {
              return <td key={`${col}${index}`}>{data[col]}</td>;
            }
          })}
        </tr>
      );
    });
  };

  //Events
  onEditStudentBtnClick = (student) => {
    if (student.id <= 0) {
      alert("Id should be greater than 0.");
      return;
    }

    this.props.navigate(`/editstudent/${student.id}`);
  };

  onDeleteStudentBtnClick = async (student) => {
    if (student.id <= 0) {
      alert("Id should be greater than 0.");
      return;
    }

    await httpService.Delete(`Students/${student.id}`);

    await this.fetchStudents();
  };

  onAddStaticEntryBtnClick = () => {
    const students = [
      ...this.state.students,
      { id: 0, firstName: "Test", lastName: "Test" },
    ];

    this.setState({
      students,
    });
  };

  render() {
    return (
      <>
        {this.props.showStudentTable ? (
          <>
            <Table striped hover responsive bordered>
              <thead>
                <tr>
                  {this.state.studentColumns.map((item, index) => {
                    return <th key={`${item}${index}`}>{item}</th>;
                  })}
                </tr>
              </thead>
              <tbody>{this.bindStudentsData()}</tbody>
            </Table>
            <br></br>
            <div className="row">
              <div className="col-6 text-start">
                <Button color="primary" onClick={this.onAddStaticEntryBtnClick}>
                  Add Static Entry
                </Button>
              </div>
              <div className="col-6 text-end">
                Total Student: {this.state.totalStudentCount}
              </div>
            </div>
          </>
        ) : (
          <h1>No Student Records found.</h1>
        )}
      </>
    );
  }
}

export default withRouter(StudentsComponent);
