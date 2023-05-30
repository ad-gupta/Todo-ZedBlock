import React from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import SignIn from "./pages/SignIn";
import "./App.css";
import Tasks from "./pages/Tasks";
import TaskComponent from "./pages/TaskComponent";
import AddTask from "./pages/AddTask";
import UpdateTask from "./pages/UpdateTask";

const Container = styled.div``;
const App = () => {
  return (
    <Container>
      <Navbar />
      <Routes>
        <Route path="/">
          <Route index element={<SignIn />} />
          <Route path="tasks">
            <Route index element={<Tasks />} />
            <Route path="add" element={<AddTask />} />
            <Route path="edit/:id" element={<UpdateTask />} />
            <Route path="showDesc/:id" element={<TaskComponent />} />
          </Route>
          <Route path="/signin" element={<SignIn />} />
        </Route>
      </Routes>
    </Container>
  );
};

export default App;
