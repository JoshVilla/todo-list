import { useState } from "react";

import style from "./app.module.scss";
import Form from "./components/Form";
import List from "./components/List";
import Tabs from "./components/Tabs";
import { Todo } from "./interface/global";
function App() {
  const [todoList, setTodoList] = useState<Todo[]>(
    JSON.parse(localStorage.getItem("todoList") || "[]")
  );
  const [tab, setTab] = useState<number>(0);

  const updateTodoList = (list: Todo[]) => {
    localStorage.setItem("todoList", JSON.stringify(list));
    setTodoList(list);
  };

  return (
    <div className={style.mainContainer}>
      <div className={style.wrapper}>
        <Form addFunction={setTodoList} onChange={updateTodoList} />
        <Tabs onChange={setTab} />
        <List list={todoList} onChange={updateTodoList} tab={tab} />
      </div>
    </div>
  );
}

export default App;
