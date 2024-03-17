import { createContext, useEffect, useState } from "react";

export const AnswerContext = createContext(null);

export const AnswerContextProvider = ({ children }) => {
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const ans = localStorage.getItem("answers");
    if (ans) setAnswers(JSON.parse(ans));
  }, []);
  return (
    <AnswerContext.Provider value={{ answers, setAnswers }}>
      {children}
    </AnswerContext.Provider>
  );
};
