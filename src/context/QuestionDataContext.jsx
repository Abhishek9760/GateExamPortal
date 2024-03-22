import { createContext, useEffect, useState } from "react";
import jsonData from "../data.json";
import { json } from "react-router-dom";
export const QuestionDataContext = createContext(null);

export const QuestionDataContextProvider = ({ children }) => {
  const [data, setData] = useState();

  useEffect(() => {
    setData(jsonData);
  }, []);

  return (
    <QuestionDataContext.Provider value={{ data, setData }}>
      {children}
    </QuestionDataContext.Provider>
  );
};
