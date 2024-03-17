import { createContext, useState } from "react";

export const QuestionDataContext = createContext(null);

export const QuestionDataContextProvider = ({ children }) => {
  const [data, setData] = useState({});

  

  return (
    <QuestionDataContext.Provider
      value={{ data, setData }}
    >
      {children}
    </QuestionDataContext.Provider>
  );
};

