import { createContext, useContext, useState } from "react";
import { QuestionDataContext } from "./QuestionDataContext";

export const CurrentQuestionContext = createContext(null);

export const CurrentQuestionContextProvider = ({ children }) => {
  const { data } = useContext(QuestionDataContext);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  useState(() => {
    if (data) setCurrentQuestion(data.section[0].question[0]);
  }, [data]);
  return (
    <CurrentQuestionContext.Provider
      value={{ currentQuestion, setCurrentQuestion }}
    >
      {children}
    </CurrentQuestionContext.Provider>
  );
};
