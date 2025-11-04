import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import * as api from '../services/api';
import styles from './AddTask.module.css';
import { useState } from 'react';

const AddTask = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleAddTask = async (task: {
    name: string;
    status: 'Incomplete' | 'Complete';
  }) => {
    try {
      await api.createTask(task);
      navigate('/'); // Redirect to home page on success
    } catch (err) {
      setError('Failed to create task.');
    }
  };

  return (
    <div className={styles.addTask}>
      <h1 className={styles.title}>Add New Task</h1>
      {error && <p className={styles.error}>{error}</p>}
      <TaskForm onSubmit={handleAddTask} buttonText="Add Task" />
    </div>
  );
};

export default AddTask;