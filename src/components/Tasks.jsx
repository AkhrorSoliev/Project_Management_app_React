import NewTask from "./NewTask";
import { useState, useEffect } from "react";

export default function Tasks({ tasks, onAdd, onDelete, onToggleStatus }) {
  const [sortedTasks, setSortedTasks] = useState(tasks);

  useEffect(() => {
    const completedTasks = tasks.filter((task) => task.completed);
    const incompleteTasks = tasks.filter((task) => !task.completed);
    setSortedTasks([...incompleteTasks, ...completedTasks]);
  }, [tasks]);

  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask onAdd={onAdd} />
      {sortedTasks.length === 0 && (
        <p className="text-stone-800 my-4">
          This project does not have any tasks yet.
        </p>
      )}
      {sortedTasks.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {sortedTasks.map((task) => (
            <li
              className="flex justify-between items-center my-4"
              key={task.id}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggleStatus(task.id)}
                  className="mr-2"
                />
                <span
                  className={
                    task.completed ? "line-through text-stone-500" : ""
                  }
                >
                  {task.text}
                </span>
              </div>
              <button
                className="text-stone-700 hover:text-red-500"
                onClick={() => onDelete(task.id)}
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
