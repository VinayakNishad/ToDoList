import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import * as api from '../services/api';
import type { ITask } from '../types';
import styles from './EditTask.module.css';

const EditTask = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<ITask | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchTask = async () => {
      try {
        setLoading(true);
        const data = await api.getTask(id);
        setTask(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch task.');
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleEditTask = async (taskUpdates: {
    name: string;
    status: 'Incomplete' | 'Complete';
  }) => {
    if (!id) return;
    try {
      await api.updateTask(id, taskUpdates);
      navigate('/'); // Redirect to home page on success
    } catch (err) {
      setError('Failed to update task.');
    }
  };

  if (loading) return <p>Loading task...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!task) return <p>Task not found.</p>;

  return (
    <div className={styles.editTask}>
      <h1 className={styles.title}>Edit Task</h1>
      {error && <p className={styles.error}>{error}</p>}
      <TaskForm
        onSubmit={handleEditTask}
        initialData={task}
        buttonText="Save Changes"
      />
    </div>
  );
};

export default EditTask;