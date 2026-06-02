import React, { useState } from "react";
import { Trash2, Plus, Check } from "lucide-react";
import { Text } from "./ui/Text";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Checkbox } from "./ui/Checkbox";
import { Task, SubTask } from "../types";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onAddSubTask: (taskId: string, title: string) => void;
  onToggleSubTask: (taskId: string, subTaskId: string) => void;
  onDeleteSubTask: (taskId: string, subTaskId: string) => void;
}

export function TaskItem({
  task,
  onToggle,
  onDelete,
  onAddSubTask,
  onToggleSubTask,
  onDeleteSubTask,
}: TaskItemProps) {
  const [newSubTaskTitle, setNewSubTaskTitle] = useState("");

  const handleAddSubTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubTaskTitle.trim()) return;
    onAddSubTask(task.id, newSubTaskTitle.trim());
    setNewSubTaskTitle("");
  };

  return (
    <div
      className={`group flex flex-col p-6 border-4 border-black ${task.color} ${task.completed ? "opacity-60" : ""} shadow-[8px_8px_0_0_#000] hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#000] transition-all relative min-h-[200px]`}
    >
      {/* Task Header */}
      <div className="flex items-start justify-between gap-4 w-full mb-4">
        <Text
          variant="h3"
          className={`break-words flex-1 ${task.completed ? "line-through decoration-4 decoration-black/50 text-black/70" : "text-black"}`}
        >
          {task.title}
        </Text>
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggle(task.id)}
        />
      </div>

      {/* Subtasks List */}
      <div className="space-y-3 mb-6">
        {task.subTasks.map((sub) => (
          <div key={sub.id} className="flex items-center gap-3 pl-4 border-l-4 border-black/20 group/sub">
            <Checkbox
              checked={sub.completed}
              onCheckedChange={() => onToggleSubTask(task.id, sub.id)}
              className="scale-75"
            />
            <span
              className={`text-sm font-bold flex-1 ${sub.completed ? "line-through text-black/40" : "text-black"}`}
            >
              {sub.title}
            </span>
            <button
              onClick={() => onDeleteSubTask(task.id, sub.id)}
              className="opacity-0 group-hover/sub:opacity-100 transition-opacity p-1 hover:bg-black/10 rounded"
              aria-label="Delete Subtask"
            >
              <Trash2 className="w-3 h-3 text-red-600" />
            </button>
            </div>
            ))}

            {/* Add Subtask Input */}
            <form onSubmit={handleAddSubTask} className="flex gap-2 mt-4">
            <Input
            type="text"
            placeholder="Add subtask..."
            value={newSubTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="h-8 text-xs py-1 px-2 border-2"
            />
            <Button type="submit" size="sm" className="h-8 px-2 py-0 border-2 shadow-[2px_2px_0_0_#000]">
            <Plus className="w-3 h-3" />
            </Button>
            </form>
            </div>

            {/* Footer */}
            <div className="mt-auto flex justify-between items-center pt-4 border-t-2 border-black">
            <span className="text-[10px] font-bold underline">
            [{new Date(task.createdAt).toISOString().split("T")[0]}]
            </span>
            <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(task.id)}
            aria-label="Delete Task"
            className="px-2 py-1 text-[10px] h-7 shadow-[2px_2px_0_0_#000]"
            >
            <Trash2 className="w-3 h-3 mr-1 stroke-[3]" /> DELETE
            </Button>
      </div>
    </div>
  );
}
