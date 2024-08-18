import React from "react";
import { Todo } from "../../types";
import Task from "./Task";
import { cookies } from "next/headers";

const TodoTable = async () => {
  const cookie = cookies().get("AccessToken");
  // console.log(cookie!.value);
  const response = await fetch(
    "https://immensely-innocent-warthog.ngrok-free.app/todos/",
    {
      cache: "no-store",
      method: "GET",
      headers: {
        Authorization: `bearer ${cookie!.value}`,
      },
    }
  );
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
