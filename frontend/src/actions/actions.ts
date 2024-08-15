"use server";
import { revalidatePath } from "next/cache";

// ? Add Todo

export const add_todo = async (
  state: { status: string; message: string },
  formData: FormData
) => {
  const new_Todo = formData.get("add_task") as string;
  try {
    const response = await fetch("http://localhost:8000/todos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: new_Todo }),
    });
    revalidatePath("/todos/");
    return { status: "success", message: "Task added successfully" };
  } catch (error) {
    return { status: "error", message: "Something went wrong" };
  }
};

// ? Edit Todo

export const edit_todo = async (
  state: { status: string; message: string },
  {
    id,
    content,
    is_completed,
  }: { id: number; content: string; is_completed: boolean }
) => {
  try {
    const response = await fetch(`http://localhost:8000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        content: content,
        is_completed: is_completed,
      }),
    });
    revalidatePath("/todos/");
    return { status: "success", message: "Task edited successfully" };
  } catch (error) {
    return { status: "error", message: "Something went wrong" };
  }
};

// ? Status Change

export const status_change = async (
  id: number,
  content: string,
  is_completed: boolean
) => {
  try {
    const response = await fetch(`http://localhost:8000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: content, is_completed: !is_completed }),
    });
    revalidatePath("/todos/");
    return { status: "success", message: "Status changed successfully" };
  } catch (error) {
    return { status: "error", message: "Something went wrong" };
  }
};

// ? Delete Todo

export const delete_todo = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:8000/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    revalidatePath("/todos/");
    return { status: "success", message: "Task deleted successfully" };
  } catch (error) {
    return { status: "error", message: "Something went wrong" };
  }
};
