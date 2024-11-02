import React, { useContext } from "react";
import { MyContext } from "../context/MyProviderr";
import axios from "axios";

const TodoForm = () => {
  const {
    setInputText,
    inputText,
    apiUrl,
    headers,
    fetchDatas,
    loading,
    isDark,
  } = useContext(MyContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputText.trim()) {
      axios
        .post(apiUrl, { todo: inputText }, { headers })
        .then(() => {
          fetchDatas();
          setInputText("");
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="todo-form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
          placeholder="Add a new todo"
          disabled={loading}
        />
      <button type="submit" className={`btn ${isDark ? 'dark-button' : ''}`}>
          ADD
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
