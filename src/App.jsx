import React, { useContext, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import MyProviderr, { MyContext } from "./context/MyProviderr";
import TodoOutputs from "./components/TodoOutputs";

function App() {
  const { fetchDatas, loading, isDark, setIsDark } = useContext(MyContext);

  useEffect(() => {
    fetchDatas();
  }, []);

  return (
    <>
      <div className={`main-container ${isDark ? "dark-app" : ""}`}>
        <div className="container">
          <TodoForm />
          <TodoOutputs />
        </div>
        <button
          className={`switch-theme ${isDark ? "dark-button" : ""}`}
          onClick={() => setIsDark(!isDark)}
        >
          Switch theme
        </button>
      </div>
    </>
  );
}

export default App;
