/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Sparkles } from 'lucide-react';
import { Text } from './components/ui/Text';
import { Button } from './components/ui/Button';
import { Input } from './components/ui/Input';
import { Card } from './components/ui/Card';
import { Checkbox } from './components/ui/Checkbox';
import { Badge } from './components/ui/Badge';
import { Task } from './types';

const TASK_COLORS = ['bg-white'];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Load initial tasks from local storage
  useEffect(() => {
    const savedTasks = localStorage.getItem('retroui-tasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (e) {
        console.error('Failed to parse tasks from local storage');
      }
    }
  }, []);

  // Save tasks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('retroui-tasks', JSON.stringify(tasks));
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
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="min-h-screen bg-[#FFDE03] p-6 md:p-12 font-mono selection:bg-black selection:text-white pb-24 flex flex-col">
      <div className="max-w-4xl mx-auto w-full space-y-12">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 border-b-4 border-black pb-6">
          <div className="flex flex-col md:flex-row items-center gap-4 text-black text-center md:text-left">
            <Text variant="h1">RETRO_TASKS</Text>
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
            tasks.map(task => (
              <div 
                key={task.id} 
                className={`group flex flex-col justify-between p-6 border-4 border-black ${task.color} ${task.completed ? 'opacity-50' : ''} shadow-[8px_8px_0_0_#000] hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#000] transition-all relative min-h-[160px]`}
              >
                <div className="flex items-start justify-between gap-4 w-full mb-4">
                  <Text 
                    variant="h3" 
                    className={`break-words flex-1 uppercase ${task.completed ? 'line-through decoration-4 decoration-black/50 text-black/70' : 'text-black'}`}
                  >
                    {task.title}
                  </Text>
                  <Checkbox checked={task.completed} onCheckedChange={() => toggleTask(task.id)} />
                </div>
                
                <div className="mt-auto flex justify-between items-center pt-4 border-t-2 border-black">
                  <span className="text-xs font-bold uppercase underline">
                    [{new Date(task.createdAt).toISOString().split('T')[0]}]
                  </span>
                  <Button 
                    variant="danger" 
                    size="sm" 
                    onClick={() => deleteTask(task.id)}
                    aria-label="Delete Task"
                    className="px-3 py-1 text-xs uppercase"
                  >
                    <Trash2 className="w-4 h-4 mr-1 stroke-[3]" /> DELETE
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
