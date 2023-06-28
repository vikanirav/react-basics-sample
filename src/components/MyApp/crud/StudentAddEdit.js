import React, { PureComponent } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import { httpService } from "../../../services/http.service";
import { withRouter } from "../../shared/WithRouter";

class StudentAddEditComponent extends PureComponent {
  studentColumns = [];

  constructor(props) {
    super(props);

    this.state = {
      student: { id: 0, firstName: "", lastName: "" },
    };
  }

  //Component life cycle
  async componentDidMount() {
    const id = +this.props?.params?.id;
    if (id && id > 0) {
      document.title = "Edit Student";
      await this.fetchStudentById(id);
    } else {
      document.title = "Add Student";
    }
  }

  //Functions
  fetchStudentById = async (id) => {
    const studentsResponse = await httpService.Get(`Students/${id}`);

    this.setState({
      student: studentsResponse,
    });
  };

  //Events
  onFirstNameChange = (e) => {
    const firstName = e.target.value;

    this.setState({ student: { ...this.state.student, firstName: firstName } });
  };

  onLastNameChange = (e) => {
    const lastName = e.target.value;

    this.setState({ student: { ...this.state.student, lastName: lastName } });
  };

  onSaveBtnClick = async () => {
    if (this.state.student.id > 0) {
      await httpService.Put(
        `Students/${this.state.student.id}`,
        this.state.student
      );
    } else {
      const studentsResponse = await httpService.Post(
        `Students`,
        this.state.student
      );
      console.log(`Inserted Student: ${JSON.stringify(studentsResponse)}`);
    }
    this.props.navigate(-1);
  };

  onCancelBtnClick = () => {
    this.props.navigate(-1);
  };

  submitForm(event) {
    event.preventDefault();
    console.log(`form submitted`);
  }

  render() {
    return (
      // <Form className="m-5" onSubmit={this.submitForm}>
      <Form className="m-5">
        <FormGroup floating>
          <Input
            id="txtId"
            name="id"
            placeholder="Id"
            type="text"
            value={this.state.student.id}
            disabled
          />
          <Label for="txtId">Id</Label>
        </FormGroup>
        <FormGroup floating>
          <Input
            id="txtFirstName"
            name="firstName"
            placeholder="First Name"
            type="text"
            value={this.state.student.firstName}
            onChange={this.onFirstNameChange}
          />
          <Label for="txtFirstName">First Name</Label>
        </FormGroup>
        <FormGroup floating>
          <Input
            id="txtLastName"
            name="lastName"
            placeholder="Last Name"
            type="text"
            value={this.state.student.lastName}
            onChange={this.onLastNameChange}
          />
          <Label for="txtLastName">Last Name</Label>
        </FormGroup>
        <Button
          id="btnSave"
          color="primary"
          className="me-2"
          onClick={this.onSaveBtnClick}
        >
          Save
        </Button>
        <Button
          id="btnCancel"
          color="secondary"
          className="me-2"
          onClick={this.onCancelBtnClick}
        >
          Cancel
        </Button>

        <Button id="btnSubmit" color="secondary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default withRouter(StudentAddEditComponent);
