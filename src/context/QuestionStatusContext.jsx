import { createContext, useEffect, useState } from "react";

export const QuestionStatusContext = createContext(null);

export const QuestionStatusContextProvider = ({ children }) => {
  const [questionStatus, setQuestionStatus] = useState(
    localStorage.getItem("status")
      ? JSON.parse(localStorage.getItem("status"))
      : {}
  );

  const saveQuestionStatus = (postId, status) => {
    console.log(postId, status);
    const newStatus = { ...questionStatus };
    newStatus[postId] = status;
    localStorage.setItem("status", JSON.stringify(newStatus));
    setQuestionStatus(newStatus);
  };

  return (
    <QuestionStatusContext.Provider
      value={{ questionStatus, saveQuestionStatus }}
    >
      {children}
    </QuestionStatusContext.Provider>
  );
};
