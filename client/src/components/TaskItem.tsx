import React from 'react';
import type { ITask } from '../types';
import styles from './TaskItem.module.css';
import { Link } from 'react-router-dom';

interface TaskItemProps {
  task: ITask;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, newStatus: 'Complete' | 'Incomplete') => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onDelete,
  onToggleStatus,
}) => {
  const handleToggle = () => {
    const newStatus = task.status === 'Incomplete' ? 'Complete' : 'Incomplete';
    onToggleStatus(task._id, newStatus);
  };

  return (
    <li className={styles.taskItem}>
      <div className={styles.taskInfo}>
        <span
          className={`${styles.taskName} ${
            task.status === 'Complete' ? styles.complete : ''
          }`}
        >
          {task.name}
        </span>
        <span
          className={`${styles.taskStatus} ${
            task.status === 'Complete'
              ? styles.statusComplete
              : styles.statusIncomplete
          }`}
        >
          {task.status}
        </span>
      </div>
      <div className={styles.taskActions}>
        <button onClick={handleToggle} className={styles.actionButton}>
          {task.status === 'Incomplete' ? 'Complete' : 'Undo'}
        </button>
        <Link to={`/edit/${task._id}`} className={styles.actionButton}>
          Edit
        </Link>
        <button
          onClick={() => onDelete(task._id)}
          className={`${styles.actionButton} ${styles.deleteButton}`}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;