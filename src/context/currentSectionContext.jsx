import { createContext, useState } from "react";

export const CurrentSectionContext = createContext(null);

export const CurrentSectionContextProvider = ({ children }) => {
  const [currentSection, setCurrentSection] = useState(0);
  return (
    <CurrentSectionContext.Provider
      value={{ currentSection, setCurrentSection }}
    >
      {children}
    </CurrentSectionContext.Provider>
  );
};
