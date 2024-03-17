import { createContext, useState } from "react";
import { data } from "../data";

export const CurrentQuestionContext = createContext(null);

export const CurrentQuestionContextProvider = ({ children }) => {
  const [currentQuestion, setCurrentQuestion] = useState(
    data.section[0].question[0]
  );
  return (
    <CurrentQuestionContext.Provider
      value={{ currentQuestion, setCurrentQuestion }}
    >
      {children}
    </CurrentQuestionContext.Provider>
  );
};
