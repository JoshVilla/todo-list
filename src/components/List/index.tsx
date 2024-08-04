import { MouseEvent, useEffect, useState } from "react";
import style from "./style.module.scss";
import { Input, message, Modal, Tooltip } from "antd";
import { GetTodo, Todo } from "../../interface/global";
import DeleteModal from "../Modal/deleteModal";

const { TextArea } = Input;
type Props = {
  list: Todo[];
  onChange: Function;
  tab: number;
};

const List = ({ list, onChange, tab }: Props) => {
  const [getList, setGetList] = useState<Todo[]>(list);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [getTodo, setGetTodo] = useState<GetTodo>({
    id: null,
    todo: "",
    isFinished: false,
  });
  const [openModal, setOpenModal] = useState(false);
  const finish = (e: MouseEvent, id: string) => {
    e.preventDefault();
    const newList = list.map((o: Todo) => {
      if (o.id === id)
        return {
          ...o,
          isFinished: true,
        };
      return o;
    });

    onChange(newList);
  };

  const onEdit = (items: Todo) => {
    setOpenModal(true);
    setGetTodo({ ...items });
  };

  const updateTodo = () => {
    if (getTodo.todo) {
      const newList = list.map((o: GetTodo) => {
        if (getTodo.id === o.id) {
          return {
            ...o,
            todo: getTodo.todo,
          };
        }
        return o;
      });

      setGetTodo({
        id: null,
        todo: "",
        isFinished: false,
      });

      setOpenModal(false);
      onChange(newList);
      messageApi.open({
        type: "success",
        content: "Todo Edited",
      });
    } else {
      messageApi.open({
        type: "error",
        content: "Empty Todo",
      });
    }
  };

  const onRemove = () => {
    const newList = list.filter((o: GetTodo) => {
      if (o.id !== getTodo.id) {
        return o;
      }
    });
    onChange(newList);
  };

  const openDeleteModalFunc = (items: GetTodo) => {
    setOpenDeleteModal((prev) => !prev);
    setGetTodo({ ...items });
  };

  enum category {
    all = 0,
    inProgress,
    finish,
  }

  useEffect(() => {
    if (tab === category.all) {
      setGetList(list);
    } else if (tab === category.inProgress) {
      setGetList(list.filter((o: GetTodo) => o.isFinished === false));
    } else if (tab === category.finish) {
      setGetList(list.filter((o: GetTodo) => o.isFinished === true));
    }
  }, [tab, list]);

  useEffect(() => {
    setGetTodo(getTodo);
  }, [getTodo]);

  useEffect(() => {
    if (openDeleteModal === false) {
      setGetTodo({
        id: null,
        todo: "",
        isFinished: false,
      });
    }
  }, [openDeleteModal]);

  return (
    <div className={style.listContainer}>
      {contextHolder}
      {getList.length ? (
        getList.map((items: Todo, index: number) => {
          return (
            <div
              className={style.item}
              key={index}
              style={{
                backgroundColor: items.isFinished ? "#075f04" : undefined,
                border: items.isFinished ? "none" : undefined,
              }}
            >
              <div>
                <div className={style.todoWrapper}>{items.todo}</div>
                <div className={style.time}>
                  <b>Created last: </b>
                  {items.createdAt}
                </div>
              </div>
              {!items.isFinished && (
                <div className={style.actionBtn}>
                  <Tooltip title="Finish" className={style.btn}>
                    <span onClick={(e) => finish(e, items.id)}>
                      <i className="fa-solid fa-check" />
                    </span>
                  </Tooltip>
                  <Tooltip title="Edit" className={style.btn}>
                    <span onClick={() => onEdit(items)}>
                      <i className="fa-regular fa-pen-to-square" />
                    </span>
                  </Tooltip>
                  <Tooltip title="Delete" className={style.btn}>
                    <span onClick={() => openDeleteModalFunc(items)}>
                      {" "}
                      <i className="fa-solid fa-trash" />
                    </span>
                  </Tooltip>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <span>No list yet</span>
      )}
      <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        title="Edit Todo"
        onOk={updateTodo}
        destroyOnClose
      >
        <TextArea
          value={getTodo.todo}
          onChange={(e) => {
            setGetTodo({
              ...getTodo,
              todo: e.target.value,
            });
          }}
        />
      </Modal>
      <DeleteModal
        open={openDeleteModal}
        message="Are you sure youn want to delete the list?"
        onClose={setOpenDeleteModal}
        deleteFunction={() => onRemove()}
      />
    </div>
  );
};

export default List;
