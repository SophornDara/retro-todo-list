/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Text } from "./components/ui/Text";
import { Button } from "./components/ui/Button";
import { Input } from "./components/ui/Input";
import { Card } from "./components/ui/Card";
import { Badge } from "./components/ui/Badge";
import { Footer } from "./components/ui/Footer";
import { TaskItem } from "./components/TaskItem";
import { Task, SubTask } from "./types";

const TASK_COLORS = ["bg-white"];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  // Load initial tasks from local storage
  useEffect(() => {
    const savedTasks = localStorage.getItem("retroui-tasks");
    if (savedTasks) {
      try {
        const parsed = JSON.parse(savedTasks);
        // Ensure subTasks exists for all tasks
        const migrated = parsed.map((t: any) => ({
          ...t,
          subTasks: t.subTasks || [],
        }));
        setTasks(migrated);
      } catch (e) {
        console.error("Failed to parse tasks from local storage");
      }
    }
  }, []);

  // Save tasks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("retroui-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: newTaskTitle.trim(),
      completed: false,
      color: TASK_COLORS[Math.floor(Math.random() * TASK_COLORS.length)],
      createdAt: Date.now(),
      subTasks: [],
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle("");
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const addSubTask = (taskId: string, title: string) => {
    setTasks(
      tasks.map((t) => {
        if (t.id === taskId) {
          const newSub: SubTask = {
            id: crypto.randomUUID(),
            title,
            completed: false,
          };
          return { ...t, subTasks: [...t.subTasks, newSub] };
        }
        return t;
      }),
    );
  };

  const toggleSubTask = (taskId: string, subTaskId: string) => {
    setTasks(
      tasks.map((t) => {
        if (t.id === taskId) {
          return {
            ...t,
            subTasks: t.subTasks.map((s) =>
              s.id === subTaskId ? { ...s, completed: !s.completed } : s,
            ),
          };
        }
        return t;
      }),
    );
  };

  const deleteSubTask = (taskId: string, subTaskId: string) => {
    setTasks(
      tasks.map((t) => {
        if (t.id === taskId) {
          return {
            ...t,
            subTasks: t.subTasks.filter((s) => s.id !== subTaskId),
          };
        }
        return t;
      }),
    );
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-[#FFDE03] p-6 md:p-12 font-sans selection:bg-black selection:text-white flex flex-col">
      <div className="max-w-4xl mx-auto w-full space-y-12">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 border-b-4 border-black pb-6">
          <div className="flex flex-col md:flex-row items-center gap-4 text-black text-center md:text-left">
            <Text variant="h1">TASK MANAGEMENT</Text>
          </div>
          <div className="flex items-center gap-4">
            <Badge color="bg-white" className="px-6 py-2 text-base md:text-lg">
              TOTAL: {tasks.length}
            </Badge>
            <Badge color="bg-white" className="px-6 py-2 text-base md:text-lg">
              DONE: {completedCount}
            </Badge>
          </div>
        </header>

        {/* Input area */}
        <Card backgroundColor="bg-white">
          <form onSubmit={addTask} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="What needs to be done?"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                autoFocus
              />
            </div>
            <Button type="submit" size="lg" className="w-full sm:w-auto">
              <Plus className="w-6 h-6 mr-2 stroke-[3]" />
              ADD TASK
            </Button>
          </form>
        </Card>

        {/* Task List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {tasks.length === 0 ? (
            <div className="col-span-1 md:col-span-2 text-center py-20 border-4 border-black border-dashed bg-white space-y-4">
              <Text variant="h3">ALL DONE</Text>
              <Text>You have no tasks for today. Add one above!</Text>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onAddSubTask={addSubTask}
                onToggleSubTask={toggleSubTask}
                onDeleteSubTask={deleteSubTask}
              />
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
