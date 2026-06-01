export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  color: string;
  createdAt: number;
  subTasks: SubTask[];
}
