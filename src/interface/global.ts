export interface Todo {
  todo: string;
  id: string;
  isFinished: boolean;
  createdAt: string;
}

export interface GetTodo {
  id: null | string;
  todo: string;
  isFinished: boolean;
  // viewMore: boolean;
}
