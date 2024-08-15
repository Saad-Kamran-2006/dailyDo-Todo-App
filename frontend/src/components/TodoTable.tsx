import React from "react";
import { Todo } from "../../types";
import Task from "./Task";

const TodoTable = async () => {
  const response = await fetch("http://localhost:8000/todos/", {
    cache: "no-store",
  });
  const data = await response.json();
  const todo_List: Todo[] = data.sort((a: Todo, b: Todo) => a.id - b.id);
  return (
    <table className="flex flex-col w-full gap-y-2">
      {/* Table Head */}
      <thead>
        <tr className="flex justify-between items-center px-2 py-1 bg-gray-100 shadow-md">
          <th>Task</th>
          <th>Actions</th>
        </tr>
      </thead>
      {/* Table Body */}
      <tbody>
        {todo_List.map((task: Todo) => (
          <Task key={task.id} task={task} />
        ))}
      </tbody>
    </table>
  );
};

export default TodoTable;
