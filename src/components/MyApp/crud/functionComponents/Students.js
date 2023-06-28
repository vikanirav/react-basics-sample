import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "reactstrap";

import { httpService } from "../../../../services/http.service";

export default function StudentsFunctionComponent(props) {
  const { showStudentTable, onAddStudentBtnClick } = props;

  let navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [studentColumns, setStudentColumns] = useState([]);

  //Component life cycle
  useEffect(() => {
    const getStudents = async () => {
      await fetchStudents();
    };

    getStudents();
  }, []);

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  });

  useEffect(() => {
    console.log(students.length);
    console.log(showStudentTable);
    //debugger;
  }, [showStudentTable, students]);

  //Functions
  const handleKeyUp = (event) => {
    const isAltKey =
      event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey;
    if (!isAltKey) return;
    switch (event.key.toLowerCase()) {
      case "a":
        onAddStaticEntryBtnClick();
        break;
      default:
        break;
    }
  };

  const fetchStudents = async () => {
    const studentsResponse = await httpService.Get(`Students`);

    const cols = Object.keys(studentsResponse[0]);

    setStudents(studentsResponse);
    setStudentColumns([...cols, "fullName", "action"]);
  };

  const bindStudentsData = () => {
    return students.map((data, index) => {
      return (
        <tr key={`row${index}`}>
          {studentColumns.map((col, index) => {
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
                      onEditStudentBtnClick(data);
                    }}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    color="link"
                    onClick={() => {
                      onDeleteStudentBtnClick(data);
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
  const onEditStudentBtnClick = (student) => {
    if (student.id <= 0) {
      alert("Id should be greater than 0.");
      return;
    }

    navigate(`/editstudent/${student.id}`);
  };

  const onDeleteStudentBtnClick = async (student) => {
    if (student.id <= 0) {
      alert("Id should be greater than 0.");
      return;
    }

    await httpService.Delete(`Students/${student.id}`);

    await fetchStudents();
  };

  const onAddStaticEntryBtnClick = () => {
    const studentList = [
      ...students,
      { id: 0, firstName: "Test", lastName: "Test" },
    ];

    setStudents(studentList);
  };

  return (
    <>
      {showStudentTable ? (
        <>
          <Table striped hover responsive bordered>
            <thead>
              <tr>
                {studentColumns.map((item, index) => {
                  return <th key={`${item}${index}`}>{item}</th>;
                })}
              </tr>
            </thead>
            <tbody>{bindStudentsData()}</tbody>
          </Table>
          <br></br>
          <Button color="primary" className="me-2" onClick={onAddStaticEntryBtnClick}>
            Add Static Entry
          </Button>

          <Button color="primary" onClick={onAddStudentBtnClick}>
            Add Student
          </Button>
        </>
      ) : (
        <h1>No Student Records found.</h1>
      )}
    </>
  );
}
