import React, { useState, useEffect } from 'react';
import TasksTable from './TasksTable';
import TaskForm from './TaskForm';
import { Task, Project } from '../../types';


const mockProjects: Project[] = [
  { id: '1', name: 'Project 1', description: 'Description for Project 1' },
  { id: '2', name: 'Project 2', description: 'Description for Project 2' }
]; // Replace with real data fetching logic

const mockTasks: Task[] = [
  { id: '1', name: 'Task 1', description: 'Description for Task 1', projectId: '1' },
  { id: '2', name: 'Task 2', description: 'Description for Task 2', projectId: '2' }
]; // Replace with real data fetching logic

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleAddClick = () => {
    setEditingTask({ id: '', name: '', description: '', projectId: '' });
    setShowForm(true);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDelete = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleFormSubmit = (task: Task) => {
    if (editingTask?.id) {
      // Updating existing task
      setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    } else {
      // Adding new task
      setTasks([...tasks, { ...task, id: Date.now().toString() }]);
    }
    setShowForm(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
        <button
          onClick={handleAddClick}
          className="px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm"
        >
          Add Task
        </button>
      </div>

      <TasksTable tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} projects={mockProjects} />

      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <TaskForm
              initialValues={editingTask || { id: '', name: '', description: '', projectId: '' }} // Ensure projectId is always a string
              projects={mockProjects} // Pass projects to the TaskForm
              onSubmit={handleFormSubmit}
            />
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
