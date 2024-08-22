// src/types.ts

export interface Project {
    id: string;
    name: string;
    description: string;
  }
  
  export interface Task {
    id: string;
    name: string;
    description: string;
    projectId: string; // Link to the project it belongs to
  }

  