import React, { MouseEvent, useEffect, useState } from "react";
import style from "./style.module.scss";
import { generateId } from "../../helpers/helpers";
import moment from "moment";
import { Button, Input, Form as AntForm, Modal } from "antd";
import { Todo } from "../../interface/global";
import DeleteModal from "../Modal/deleteModal";
type Props = {
  addFunction: Function;
  onChange: Function;
};

const Form = ({ addFunction, onChange }: Props) => {
  const [todo, setTodo] = useState<string>("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const getAllList = JSON.parse(localStorage.getItem("todoList") || "[]");

  const add = (e: MouseEvent) => {
    const todoObj = {
      todo,
      id: generateId(),
      isFinished: false,
      createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
    };
    e.preventDefault();
    if (!todo) return;
    addFunction((prev: Todo[]) => [...prev, todoObj]);
    const isSetInLocalStorage = localStorage.getItem("todoList");
    if (isSetInLocalStorage === null) {
      localStorage.setItem("todoList", JSON.stringify([todoObj]));
    } else {
      const newTodoList = [
        ...JSON.parse(localStorage.getItem("todoList") || "[]"),
        todoObj,
      ];

      localStorage.setItem("todoList", JSON.stringify(newTodoList));
    }
    setTodo("");
  };

  return (
    <div className={style.formContainer}>
      <AntForm>
        <Input
          value={todo}
          type="text"
          placeholder="Add Todo"
          onChange={(e) => setTodo(e.target.value)}
        />
        <Button size="small" type="primary" htmlType="submit" onClick={add}>
          Add
        </Button>
        {getAllList.length > 0 && (
          <Button
            size="small"
            onClick={() => setOpenDeleteModal((prev) => !prev)}
            type="primary"
            danger
          >
            Delete All
          </Button>
        )}
      </AntForm>
      <DeleteModal
        message="Are you sure you want to delete all the list?"
        onClose={setOpenDeleteModal}
        deleteFunction={() => {
          onChange([]);
        }}
        open={openDeleteModal}
      />
    </div>
  );
};

export default Form;
