import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Task from "../Components/task";
import { useNavigate } from "react-router";
import axios from "axios";

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 767px) {
    padding: 10px;
  }
`;

const Title = styled.h1`
  color: #3498db;
  margin-top: 0;
  text-align: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
`;

const AddTaskButton = styled(Button)`
  background-color: #27ae60;
  margin-bottom: 10px;

  @media (max-width: 767px) {
    margin-bottom: 5px;
    font-size: 14px;
  }
`;

const DeleteAllTasksButton = styled(Button)`
  background-color: #ff4d4d;
  margin-left: 10px;

  @media (max-width: 767px) {
    margin-left: 5px;
    font-size: 14px;
  }
`;

const SortTasksButton = styled(Button)`
  background-color: #9b59b6;
  margin-left: 10px;

  @media (max-width: 767px) {
    font-size: 10px;
  }
`;

const SearchBar = styled.input`
  display: flex;
  align-items: center;
  padding: 3px;
  border: 1px solid rgba(10, 104, 203);
  padding: 5px 15px;
  border-radius: 4px;
  margin-right: -7px;
  border-right: none;
`;

const SearchButton = styled(Button)`
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1px solid rgba(10, 104, 203);
  color: rgba(10, 104, 203);
  padding: 5px 15px;
  border-radius: 4px;
  border-left: none;
  gap: 5px;
`;

const Searching = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 10px;
`;

const Search1 = styled.div`
  display: flex;
  align-items: center;
`;

const SubTasks = styled.div`
  text-align: right;
  margin: 20px 0px;
`;

// const task = [
//   {
//     id: 1,
//     title: "Task 1",
//     description: "Description of Task 1",
//     active: true,
//     completed: false,
//   },
//   {
//     id: 2,
//     title: "Task 2",
//     description: "Description of Task 2",
//     active: false,
//     completed: true,
//   },
//   {
//     id: 3,
//     title: "Task 3",
//     description: "Description of Task 3",
//     active: true,
//     completed: false,
//   },
// ];

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("/tasks/")
      .then(function (response) {
        // Handle the success response
        setTasks(response.data.task);
      })
      .catch(function (error) {
        // Handle the error
        console.log(error);
      });
  }, []);

  const navigate = useNavigate();
  const handleAddTask = () => {
    navigate("/tasks/add");
  };

  const handleDeleteAllTasks = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/tasks/deleteAll`
      );
      console.log(response);
      if (response.status === 200) {
        alert(response.data.message);
        navigate(0);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSortTasks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/tasks/sort/title`
      );
      console.log(response.data);
      if (response.status === 200) {
        setTasks(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/tasks/search`, {
        params: {
          searchTerm,
        },
      });
      console.log(response.data);
      if (response.status === 200) {
        setTasks(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PageContainer>
      <Title>Tasks</Title>

      <Searching>
        <Search1>
          <SearchBar
            type="text"
            placeholder="Search task"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <SearchButton onClick={handleSearchTasks}>Search</SearchButton>
        </Search1>
        <SortTasksButton onClick={handleSortTasks}>SortTasks</SortTasksButton>
      </Searching>
      {tasks.length ? (
        tasks.map((task) => (
          <Task
            key={task._id}
            id={task._id}
            title={task.title}
            description={task.description}
            active={task.active}
            completed={task.completed}
          />
        ))
      ) : (
        <p style={{ color: "red", textAlign: "center" }}>
          No Task To Show, Start Adding Tasks
        </p>
      )}
      <SubTasks>
        <AddTaskButton onClick={handleAddTask}>Add Task</AddTaskButton>

        <DeleteAllTasksButton onClick={handleDeleteAllTasks}>
          Delete All Tasks
        </DeleteAllTasksButton>
      </SubTasks>
    </PageContainer>
  );
};

export default TasksPage;
