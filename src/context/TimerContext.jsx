import { createContext, useEffect, useState } from "react";

export const TimerContext = createContext(null);

export const TimerContextProvider = ({ children }) => {
  const [timer, setTimer] = useState({});

  return (
    <TimerContext.Provider value={{ timer, setTimer }}>
      {children}
    </TimerContext.Provider>
  );
};
