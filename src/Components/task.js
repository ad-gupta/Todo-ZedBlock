import React, { useState } from "react";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const TaskContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f2f2f2;
  margin-bottom: 10px;
  border-radius: 5px;
  // justify-content: space-around;
`;

const TaskTitle = styled.h3`
  flex: 2;
  margin: 0;
  font-size: 18px;
`;

const TaskDescription = styled.div`
  flex: 1;
  border: 1px solid rgb(3, 3, 61);
  border-radius: 5px;
  padding: 5px;
  background-color: rgb(3, 3, 61, 0.9);
  text-align: center;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 5px;
  border: none;
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
`;

const DeleteButton = styled(Button)`
  background-color: #ff4d4d;
  margin-left: 10px;
`;

const UpdateButton = styled(Button)`
  background-color: #3498db;
`;

const Check = styled.div`
  flex: 2;
`;

const Check1 = styled.div`
  display: flex;
  align-items: center;
`;
const Task = ({ id, title, description, active, completed }) => {
  const [activ, setActiv] = useState(active);
  const [complete, setComplete] = useState(completed);

  const navigate = useNavigate();
  const handleActiveChange = () => {
    setActiv(!activ);
  };

  const handleCompletedChange = () => {
    setComplete(!complete);
  };

  const handleDeleteTask = async() => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/tasks/delete/${id}`
      );
      console.log(response);
      if (response.status === 200) {
        alert(response.data.message)
        navigate(0)
      }
    } catch (err) {
      console.log(err);
    }
  };
  // const {id} = useParams()
  const handleUpdateTask = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/tasks/edit/${id}`,
        { title, description, active: activ, completed: complete }
      );
      console.log(response.data.data);
      if (response.status === 200) {
        setActiv(response.data.data.active);
        setComplete(response.data.data.completed);
        navigate("/tasks");
        // console.log(response.data)
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TaskContainer>
      <Check>
        <Check1>
          <Checkbox
            type="checkbox"
            checked={activ}
            onChange={handleActiveChange}
          />
          <p>Active</p>
        </Check1>
        <Check1>
          <Checkbox
            type="checkbox"
            checked={complete}
            onChange={handleCompletedChange}
          />
          <p>Completed</p>
        </Check1>
      </Check>
      <TaskTitle>{title}</TaskTitle>
      <TaskDescription>
        <Link
          to={`/tasks/showDesc/${id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          description
        </Link>
      </TaskDescription>
      <UpdateIcon style={{ flex: "2" }} onClick={handleUpdateTask}>
        Update
      </UpdateIcon>
      <DeleteIcon style={{ flex: "2" }} onClick={handleDeleteTask}>
        Delete
      </DeleteIcon>
    </TaskContainer>
  );
};

export default Task;
