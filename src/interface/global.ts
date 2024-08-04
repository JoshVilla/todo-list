export interface Todo {
  todo: string;
  id: string | null;
  isFinished: boolean;
  createdAt: string;
  editedAt: string;
}

export interface GetTodo {
  id: null | string;
  todo: string;
  isFinished: boolean;
  // viewMore: boolean;
}
