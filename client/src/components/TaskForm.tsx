import React, { useState, useEffect } from 'react';
import type { ITask } from '../types';
import styles from './TaskForm.module.css';

interface TaskFormProps {
  onSubmit: (task: { name: string; status: 'Incomplete' | 'Complete' }) => void;
  initialData?: ITask;
  buttonText: string;
}

const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  initialData,
  buttonText,
}) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'Incomplete' | 'Complete'>('Incomplete');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setStatus(initialData.status);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      alert('Please enter a task name');
      return;
    }
    onSubmit({ name, status });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Task Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Build the frontend"
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as 'Incomplete' | 'Complete')
          }
        >
          <option value="Incomplete">Incomplete</option>
          <option value="Complete">Complete</option>
        </select>
      </div>
      <button type="submit" className={styles.submitButton}>
        {buttonText}
      </button>
    </form>
  );
};

export default TaskForm;