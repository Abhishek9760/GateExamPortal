import "./App.css";
import LeftMenu from "./components/LeftMenu";
import { RightMenu } from "./components/RightMenu";
import {
  CurrentQuestionContextProvider,
  CurrentQuestionNumberContextProvider,
  CurrentSectionContextProvider,
} from "./context";
import { AnswerContextProvider } from "./context/AnswerContext";
import { QuestionStatusContextProvider } from "./context/QuestionStatusContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Result from "./components/Result";

import {
  QuestionDataContext,
  QuestionDataContextProvider,
} from "./context/QuestionDataContext";
import { useContext } from "react";

import { TimerContext, TimerContextProvider } from "./context/TimerContext";

// import { MathJaxContext } from "better-react-mathjax";

const Header = ({ title }) => {
  return (
    <div className="header2">
      <div className="headerTable">
        <div className="examHeaderItem examLogo">
          <a href="/">
            <img src="./Assessment Examination Center_files/logo1.png" />
          </a>
        </div>
        <div className="examHeaderItem">
          <font
            size="4"
            color="#ffffff"
            style={{ position: "relative", top: "10px" }}
          >
            <b className="examName">{title}</b>
          </font>
        </div>
      </div>
    </div>
  );
};

const Content = () => {
  return (
    <div className="content" id="page-content" style={{ marginTop: "45px" }}>
      <LeftMenu />
      <RightMenu />
    </div>
  );
};

const Main = () => {
  const { data } = useContext(QuestionDataContext);
  return (
    <>
      <Header title={data ? data["name"] : ""} />
      <Content />
    </>
  );
};

function App() {
  return (
    <TimerContextProvider>
      <QuestionDataContextProvider>
        <QuestionStatusContextProvider>
          <AnswerContextProvider>
            <CurrentQuestionContextProvider>
              <CurrentQuestionNumberContextProvider>
                <CurrentSectionContextProvider>
                  <Router>
                    <Routes>
                      <Route path="/home" element={<Main />}></Route>
                      <Route path="/" element={<Home />}></Route>
                      <Route path="/result" element={<Result />}></Route>
                    </Routes>
                  </Router>
                </CurrentSectionContextProvider>
              </CurrentQuestionNumberContextProvider>
            </CurrentQuestionContextProvider>
          </AnswerContextProvider>
        </QuestionStatusContextProvider>
      </QuestionDataContextProvider>
    </TimerContextProvider>
  );
}

export default App;
