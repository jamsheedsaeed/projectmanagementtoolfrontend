import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../../components/FormInput';
import { Task, Project } from '../../types';

interface TaskFormProps {
  initialValues: Task;
  projects: Project[]; // Add projects to the props
  onSubmit: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialValues, projects, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      id: initialValues.id,
      name: initialValues.name,
      description: initialValues.description,
      projectId: initialValues.projectId || '', // Ensure it's a string
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      projectId: Yup.string().required('Required'), // Ensure projectId is validated
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormInput
        id="name"
        name="name"
        type="text"
        label="Task Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && formik.errors.name ? formik.errors.name : undefined}
      />

      <FormInput
        id="description"
        name="description"
        type="text"
        label="Description"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.description && formik.errors.description ? formik.errors.description : undefined}
      />

      <div className="mb-4">
        <label htmlFor="projectId" className="block text-sm font-medium text-gray-700">Project</label>
        <select
          id="projectId"
          name="projectId"
          value={formik.values.projectId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`mt-1 block w-full px-3 py-2 border ${formik.touched.projectId && formik.errors.projectId ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        >
          <option value="" disabled>Select a project</option>
          {projects.map(project => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
        {formik.touched.projectId && formik.errors.projectId && (
          <p className="text-red-500 text-xs mt-2">{formik.errors.projectId}</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm"
        >
          Save Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
