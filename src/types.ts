export type ISODate = string; // format: YYYY-MM-DD

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: ISODate; // optional deadline
  createdAt: string; // ISO timestamp
  completedAt?: string; // ISO timestamp when completed
}

export type TaskUpdate = Partial<Omit<Task, 'id' | 'createdAt'>> & { id: string };
