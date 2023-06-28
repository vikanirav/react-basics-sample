import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard.js";
import ImportExport from "./importExport/ImportExport.js";
import TodoListFunctionComponent from "./jsx/TodoListFunction.js";
import TodoListClassComponent from "./jsx/TodoListClass.js";
import CrudComponent from "./crud/classComponents/Crud.js";
import StudentAddEditComponent from "./crud/StudentAddEdit.js";
import CrudFunctionComponent from "./crud/functionComponents/Crud.js";

export function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Dashboard />} />
      <Route exact path="/importexport" element={<ImportExport />}></Route>
      <Route
        exact
        path="/todolistfunction"
        element={<TodoListFunctionComponent />}
      ></Route>
      <Route
        exact
        path="/todolistclass"
        element={<TodoListClassComponent />}
      ></Route>
      <Route
        exact
        path="/studentsclassexample"
        element={<CrudComponent />}
      ></Route>
      <Route
        exact
        path="/studentsfunexample"
        element={<CrudFunctionComponent />}
      ></Route>
      <Route
        exact
        path="/addstudent"
        element={<StudentAddEditComponent />}
      ></Route>
      <Route
        exact
        path="/editstudent/:id"
        element={<StudentAddEditComponent />}
      ></Route>
    </Routes>
  );
}
