import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const AddTaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  gap: 10px;
`;

const InputField = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: none;
  border: 2px solid rgb(20, 20, 79);
  border-radius: 4px;
  outline: none;
`;

const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const CheckBoxLabel = styled.label`
  margin-left: 5px;
  font-weight: 500;
`;

const AddButton = styled.button`
  padding: 10px 20px;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ErrMsg = styled.p`
  font-size: 10px;
  color: red;
  margin: -5px 0;
`;

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [titleErr, setTitleErr] = useState("");
  const [descErr, setDescErr] = useState("");

  const navigate = useNavigate();

  const handleAdd = async () => {
    // Perform your logic here, e.g., send the data to an API or update state in parent component

    try {
      const response = await axios.post(
        "http://localhost:8000/api/tasks/addTask",
        { title, description, active, completed }
      );
      console.log(response.data);
      if (response.status === 201) {
        navigate("/tasks");
        // console.log(response.data)
      }
    } catch (err) {
      if (
        err.response &&
        err.response.data &&
        err.response.data.error === "max allowable length is of 50 chars"
      ) {
        setDescErr("");
        setTitleErr(err.response.data.error);
      } else if (
        err.response &&
        err.response.data &&
        err.response.data.error === "max allowable length is of 256 chars"
      ) {
        setTitleErr("");
        setDescErr(err.response.data.error);
      } else console.log(err);
    }
    // console.log();
  };

  return (
    <AddTaskContainer>
      <InputField
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <ErrMsg>{titleErr}</ErrMsg>
      <InputField
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <ErrMsg>{descErr}</ErrMsg>
      <CheckBoxContainer>
        <input
          type="checkbox"
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
        />
        <CheckBoxLabel>Active</CheckBoxLabel>
      </CheckBoxContainer>
      <CheckBoxContainer>
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        <CheckBoxLabel>Completed</CheckBoxLabel>
      </CheckBoxContainer>
      <AddButton onClick={handleAdd}>Add</AddButton>
    </AddTaskContainer>
  );
};

export default AddTask;
