"use client";
import React from "react";
import { Todo } from "../../types";
import { CiSquareCheck } from "react-icons/ci";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import ToolTip from "./ToolTip";
import { Modal } from "./Modal";
import { delete_todo, status_change } from "@/actions/actions";
import toast from "react-hot-toast";

const Task = ({ task }: { task: Todo }) => {
  const handleStatus = async () => {
    const response = await status_change(
      task.id,
      task.content,
      task.is_completed
    );
    if (response.status === "success") {
      toast.success(response.message);
    } else if (response.status === "error") {
      toast.error(response.message);
    }
  };
  const handleDelete = async () => {
    const response = await delete_todo(task.id);
    if (response.status === "success") {
      toast.success(response.message);
    } else if (response.status === "error") {
      toast.error(response.message);
    }
  };
  return (
    <tr className="flex justify-between items-center border-b border-gray-300 px-2 py-1">
      <td className="font-semibold">{task.content}</td>
      <td className="flex gap-x-2">
        <ToolTip tool_tip_content="Mark as completed">
          <button onClick={handleStatus}>
            <CiSquareCheck
              size={28}
              className={`${
                task.is_completed ? "text-teal-600" : "text-gray-300"
              }`}
            />
          </button>
        </ToolTip>
        <ToolTip tool_tip_content="Edit Task">
          <Modal title="Edit Task" Editing={true} task={task}>
            <FiEdit size={24} className="text-blue-500" />
          </Modal>
        </ToolTip>
        <ToolTip tool_tip_content="Delete Task">
          <button onClick={handleDelete}>
            <FiTrash2 size={24} className="text-red-600" />
          </button>
        </ToolTip>
      </td>
    </tr>
  );
};

export default Task;
