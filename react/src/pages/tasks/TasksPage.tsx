import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../../store/authStore";
import "./tasks.scss"
import { Link } from "react-router-dom";

interface Task {
  _id: string;
  title: string;
  status: "pending" | "completed";
}

const TasksPage = () => {
  const { token, logout } = useAuthStore();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState("");
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get<Task[]>("http://localhost:5174/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(data);
      } catch (err) {
        console.error("Error fetching tasks", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [token]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get("http://localhost:5174/tasks/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(data);
      } catch (err) {
        console.error("Error fetching stats", err);
      }
    };
    fetchStats();
  }, [tasks]);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const { data } = await axios.post(
        "http://localhost:5174/tasks",
        { title: newTask },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks([...tasks, data]);
      setNewTask("");
    } catch (err) {
      console.error("Error adding task", err);
    }
  };

  const handleCompleteTask = async (taskId: string) => {
    try {
      await axios.put(`http://localhost:5174/tasks/${taskId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(tasks.map((task) =>
        task._id === taskId ? { ...task, status: "completed" } : task
      ));
    } catch (err) {
      console.error("Error completing task", err);
    }
  };

  return (
    <div className="container">
      <h2>Task Manager</h2>

      <form onSubmit={handleAddTask} className="task-form">
        <input
          type="text"
          placeholder="New task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="task-input"
        />
        <button type="submit" className="add-btn">Add Task</button>
      </form>

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task._id} className={`task-item ${task.status === "completed" ? "completed" : ""}`}>
              <span>{task.title}</span>
              {task.status === "pending" && (
                <button onClick={() => handleCompleteTask(task._id)} className="complete-btn">
                  Complete
                </button>
              )}
              {task.status === "completed" && <span>✅</span>}
            </li>
          ))}
        </ul>
      )}

      <div className="stats">
        <h3>Task Statistics</h3>
        <p>Total: <strong>{stats.total}</strong></p>
        <p>Completed: <strong>{stats.completed}</strong></p>
        <p>Pending: <strong>{stats.pending}</strong></p>
      </div>

      <button onClick={logout} className="logout-btn">Logout</button>

      <Link to="/image-to-text">
        <button className="upload-btn">Convert Image to Text</button>
      </Link>
    </div>
    
  );
};

export default TasksPage;
