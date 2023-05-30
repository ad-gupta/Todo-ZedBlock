import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 767px) {
    padding: 10px;
  }
`;

const TaskTitle = styled.h2`
  color: #333;
  margin-bottom: 8px;
`;

const TaskDescription = styled.p`
  color: #777;
  margin-bottom: 16px;
`;

const Button = styled.button`
  background-color: ${(props) => props.backgroundColor || "#4caf50"};
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Check = styled.div`
  flex: 2;
`;

const Check1 = styled.div`
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const TaskComponent = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState({});
  const [activ, setActiv] = useState(false);
  const [complete, setComplete] = useState(false);

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    axios
      .get(`/tasks/find/${id}`)
      .then(function (response) {
        setTasks(response.data.task);
      })
      .catch(function (error) {
        // Handle the error
        console.log(error);
      });
  }, []);
  const handleDeleteTask = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/tasks/delete/${id}`
      );
      console.log(response);
      if (response.status === 200) {
        alert(response.data.message);
        navigate('/tasks');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditTask = () => {
    // Perform edit logic here
    navigate(`/tasks/edit/${id}`);
  };

  const handleActiveChange = () => {
    setActiv(!tasks.active);
  };

  const handleCompletedChange = () => {
    setComplete(!tasks.completed);
  };

  return (
    <Container>
      <TaskTitle>{tasks.title} </TaskTitle>
      <Check>
        <Check1>
          <Checkbox
            type="checkbox"
            checked={tasks.active}
            onChange={handleActiveChange}
          />
          <p>Active</p>
        </Check1>
        <Check1>
          <Checkbox
            type="checkbox"
            checked={tasks.completed}
            onChange={handleCompletedChange}
          />
          <p>Completed</p>
        </Check1>
      </Check>
      <TaskDescription>{tasks.description} </TaskDescription>
      <Button onClick={handleDeleteTask} backgroundColor="#f44336">
        Delete Task
      </Button>
      <Button onClick={handleEditTask} backgroundColor="#2196f3">
        Edit Task
      </Button>
    </Container>
  );
};

export default TaskComponent;
