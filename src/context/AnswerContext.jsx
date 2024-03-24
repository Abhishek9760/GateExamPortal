import { createContext, useContext, useEffect, useState } from "react";
import { QuestionDataContext } from "./QuestionDataContext";

export const AnswerContext = createContext(null);

export const AnswerContextProvider = ({ children }) => {
  const { data } = useContext(QuestionDataContext);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const ans = localStorage.getItem(`${data?.name}-answer`);
    if (ans) setAnswers(JSON.parse(ans));
  }, []);

  const saveAnswerToStorage = (examName, postId, answer) => {
    const answers = localStorage.getItem(`${examName}-answer`);
    if (!answers) {
      localStorage.setItem(
        `${examName}-answer`,
        JSON.stringify({ [postId]: answer })
      );
    } else {
      const answersObj = JSON.parse(answers);
      answersObj[postId] = answer;
      localStorage.setItem(`${examName}-answer`, JSON.stringify(answersObj));
      setAnswers(answersObj);
    }
  };

  return (
    <AnswerContext.Provider
      value={{ answers, setAnswers, saveAnswerToStorage }}
    >
      {children}
    </AnswerContext.Provider>
  );
};
