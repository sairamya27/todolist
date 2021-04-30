import React, { useState } from "react";
import "./styles.css";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [count, setCount] = useState(0);
  const [todo, setTodo] = useState({
    id: "",
    task: "",
    completed: false
  });

  function addTodo(todo) {
    setTodos([...todos, todo]);
    setCount(count + 1);
  }
  function toggleComplete(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          if (todo.completed) setCount(count + 1);
          else setCount(count - 1);
          return {
            ...todo,
            completed: !todo.completed
          };
        }
        return todo;
      })
    );
  }

  function handleTaskInputChange(e) {
    setTodo({ ...todo, task: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (todo.task.trim()) {
      addTodo({ ...todo, id: uuidv4() });
      //reset task input
      setTodo({ ...todo, task: "" });
    }
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          name="task"
          type="text"
          value={todo.task}
          onChange={handleTaskInputChange}
        />
        <button type="submit">Add</button>
      </form>
      <p>
        {count} remaining out of {todos.length} tasks{" "}
      </p>
      <ul>
        {todos.map((item) => (
          <li
            key={item.id}
            onClick={() => toggleComplete(item.id)}
            style={{
              color: "black",
              textDecoration: item.completed ? "line-through" : null
            }}
          >
            {item.task}
          </li>
        ))}
      </ul>
    </div>
  );
}
