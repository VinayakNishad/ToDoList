import { useState, useEffect, useMemo } from 'react'; // 1. Import useMemo
import type { ITask } from '../types';
import * as api from '../services/api';
import TaskList from '../components/TaskList';
import styles from './Home.module.css';
import controlsStyles from './HomeControls.module.css'; // 2. Import new styles

const Home = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- 3. Add new state for controls ---
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Complete' | 'Incomplete'>('All');
  const [sortBy, setSortBy] = useState<'name' | 'status'>('name');

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await api.getTasks();
      setTasks(data); // This is the "master list"
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // --- 4. Create the processed task list ---
  const processedTasks = useMemo(() => {
    let processed = [...tasks];

    // 1. Apply Search
    if (searchTerm) {
      processed = processed.filter((task) =>
        task.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. Apply Filter
    if (filterStatus !== 'All') {
      processed = processed.filter((task) => task.status === filterStatus);
    }

    // 3. Apply Sort
    processed.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name); // Sort by name (A-Z)
      } else {
        return a.status.localeCompare(b.status); // Sort by status (Complete, Incomplete)
      }
    });

    return processed;
  }, [tasks, searchTerm, filterStatus, sortBy]); // Re-run whenever these change

  // --- Handlers (Delete/Toggle) still operate on the main 'tasks' state ---
  const handleDelete = async (id: string) => {
    try {
      await api.deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      setError('Failed to delete task.');
    }
  };

  const handleToggleStatus = async (
    id: string,
    newStatus: 'Complete' | 'Incomplete'
  ) => {
    try {
      const updatedTask = await api.updateTask(id, { status: newStatus });
      setTasks(
        tasks.map((task) => (task._id === id ? updatedTask : task))
      );
    } catch (err) {
      setError('Failed to update task status.');
    }
  };

  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Your Tasks</h1>

      {/* --- 5. Add the new controls UI --- */}
      <div className={controlsStyles.controlsContainer}>
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search tasks..."
          className={controlsStyles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        {/* Filter Dropdown */}
        <div className={controlsStyles.selectWrapper}>
          <label htmlFor="filter">Filter by:</label>
          <select
            id="filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'All' | 'Complete' | 'Incomplete')}
          >
            <option value="All">All</option>
            <option value="Complete">Complete</option>
            <option value="Incomplete">Incomplete</option>
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className={controlsStyles.selectWrapper}>
          <label htmlFor="sort">Sort by:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'status')}
          >
            <option value="name">Name</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>

      {loading && <p>Loading tasks...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !error && (
        <TaskList
          // 6. Pass the new processed list to the TaskList
          tasks={processedTasks} 
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
        />
      )}
    </div>
  );
};

export default Home;

