import { createContext, useContext, useEffect, useState } from "react";
import { QuestionDataContext } from "./QuestionDataContext";

export const QuestionStatusContext = createContext(null);

export const QuestionStatusContextProvider = ({ children }) => {
  const { data } = useContext(QuestionDataContext);
  const [questionStatus, setQuestionStatus] = useState({});

  useEffect(() => {
    if (data?.name) {
      let status = localStorage.getItem(`${data.name}-status`);
      if (status) {
        status = JSON.parse(status);
        setQuestionStatus(status);
      }
    }
  }, [data]);

  const saveQuestionStatus = (examName, postId, status) => {
    console.log(postId, status);
    const newStatus = { ...questionStatus };
    newStatus[postId] = status;
    localStorage.setItem(`${examName}-status`, JSON.stringify(newStatus));
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
