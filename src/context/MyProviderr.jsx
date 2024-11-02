import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const MyContext = createContext();

const MyProviderr = ({ children }) => {
  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = process.env.REACT_APP_BASE_URL;
  const headers = {
    apiKey,
    Authorization: `Bearer ${apiKey}`,
  };
  console.log("API URL:", apiUrl);
  const fetchDatas = () => {
    setLoading(true);
    axios
      .get(`${apiUrl}?select=*`, { headers })
      .then((res) => {
        setData(res?.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <MyContext.Provider
      value={{
        data,
        setData,
        inputText,
        setInputText,
        editId,
        setEditId,
        editText,
        setEditText,
        apiUrl,
        headers,
        fetchDatas,
        loading,
        setLoading,
        isDark,
        setIsDark,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyProviderr;
