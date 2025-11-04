import type { ITask } from '../types';
import TaskItem from './TaskItem';
import styles from './TaskList.module.css';

interface TaskListProps {
  tasks: ITask[];
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, newStatus: 'Complete' | 'Incomplete') => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDelete,
  onToggleStatus,
}) => {
  if (tasks.length === 0) {
    return <p className={styles.noTasks}>No tasks yet. Add one!</p>;
  }

  return (
    <ul className={styles.taskList}>
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </ul>
  );
};

export default TaskList;