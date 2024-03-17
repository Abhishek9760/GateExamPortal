import { createContext, useState } from "react";

export const CurrentQuestionNumberContext = createContext(null);

export const CurrentQuestionNumberContextProvider = ({ children }) => {
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState({
    id: Math.floor(Math.random() * 1000),
    num: 0,
  });
  return (
    <CurrentQuestionNumberContext.Provider
      value={{ currentQuestionNumber, setCurrentQuestionNumber }}
    >
      {children}
    </CurrentQuestionNumberContext.Provider>
  );
};
