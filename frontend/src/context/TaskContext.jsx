import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from "axios";
import * as PropTypes from "prop-types";
import Row from "../components/Row";

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [count, setCount] = useState([]);
    const [metadata, setMetadata] = useState({ currentPage: 1, itemCount: 0, itemsPerPage: 5, totalItems: 0, totalPages: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [refresh, setRefresh] = useState(true);

  const getTasks = async (metadata) => {
    const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/v1/tasks?page=${metadata.currentPage}&pageSize=${metadata.itemsPerPage}`,
    );
    setTasks(data.items);
    setIsLoading(false);
    setMetadata(data.meta);
  };

    const getCount = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/v1/tasks/count`);
        setCount(data)
    }

  const updateTask = async (row) => {
        await axios.patch(`${process.env.REACT_APP_BACKEND_URL}api/v1/tasks/${row.id}`, {state: 'done'})
        setRefresh(true);
      };

  const createTask = async (values) => {
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/v1/tasks`, values, {});
    setRefresh(true);
  }

  const deleteTask = async (row) => {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}api/v1/tasks/${row.id}`);
        setRefresh(true);
      };


  useEffect(() => {
      if(refresh) {
          getTasks(metadata).catch(console.log)
          getCount().catch(console.log)
          setRefresh(false);
      }
  }, [refresh, metadata.currentPage, metadata.itemsPerPage])

  return (
    <TaskContext.Provider value={{ tasks, createTask, updateTask, deleteTask, getTasks, getCount, isLoading, metadata, setMetadata, setIsLoading, count, setRefresh }}>
      {children}
    </TaskContext.Provider>
  );
};

TaskProvider.propTypes = {
    children: PropTypes.object
};
