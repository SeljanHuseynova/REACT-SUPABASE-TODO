import React, { useContext } from "react";
import { MyContext } from "../context/MyProviderr";
import { TiDeleteOutline } from "react-icons/ti";
import { FaRegEdit, FaRegSave } from "react-icons/fa";
import axios from "axios";
import Spinner from "./Spinner";

const TodoOutputs = () => {
  const {
    setEditText,
    data,
    editId,
    editText,
    apiUrl,
    headers,
    fetchDatas,
    setData,
    setEditId,
    loading,
  } = useContext(MyContext);

  const handleDelete = (id) => {
    axios
      .delete(`${apiUrl}?id=eq.${id}`, { headers })
      .then(() => fetchDatas())
      .catch((err) => console.error(err));
  };

  const handleSaveEdit = (id) => {
    axios
      .patch(`${apiUrl}?id=eq.${id}`, { todo: editText }, { headers })
      .then(() => {
        setData((prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, todo: editText } : item
          )
        );
        setEditId(null);
        setEditText("");
      })
      .catch((err) => console.error(err));
  };

  const handleEdit = (id, todo) => {
    setEditId(id);
    setEditText(todo);
  };

  const totalTasks = data.length;

  return (
    <div className="results-container">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="task-summary">
            <span>Total Tasks: {totalTasks}</span>
          </div>
          <ul>
            {data.map((el, index) => (
              <li key={el.id} className="todo">
                {editId === el.id ? (
                  <div className="todo-output">
                    <input
                      className="todo-input"
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <div className="icon-container">
                      <FaRegSave
                        className="icon"
                        onClick={() => handleSaveEdit(el.id)}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <span className="todo-number">{index + 1}.</span> {el.todo}
                    <div className="right">
                      <div className="icons">
                        <div className="icon-container">
                          <FaRegEdit
                            className="icon"
                            onClick={() => handleEdit(el.id, el.todo)}
                          />
                        </div>
                        <div className="icon-container">
                          <TiDeleteOutline
                            className="icon"
                            onClick={() => handleDelete(el.id)}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default TodoOutputs;
