"use client";
import React, { useEffect } from "react";
import { Todo } from "../../types";
import { useFormState } from "react-dom";
import { edit_todo } from "@/actions/actions";
import SubmitButton from "./SubmitButton";
import toast from "react-hot-toast";
import { useState } from "react";

const EditTask = ({ task }: { task: Todo | undefined }) => {
  const [value, setValue] = useState(task!.content);
  const [state, formAction] = useFormState(edit_todo, {
    status: "",
    message: "",
  });
  const handleSubmit = (formData: FormData) => {
    const id: number = task!.id;
    const content: string = formData.get("edit_task") as string;
    const is_completed: boolean = task!.is_completed;
    formAction({ id, content, is_completed });
  };

  const { status, message } = state;
  useEffect(() => {
    if (status === "success") {
      toast.success(message);
    } else if (status === "error") {
      toast.error(message);
    }
  }, [state]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <form
      action={handleSubmit}
      className="flex flex-col justify-between items-center gap-y-3 w-full"
    >
      <input
        onChange={handleChange}
        type="text"
        minLength={3}
        maxLength={54}
        required
        name="edit_task"
        value={value}
        className="w-full px-2 py-1 border border-gray-100 rounded-md"
      />
      <SubmitButton />
    </form>
  );
};

export default EditTask;
