import { useState, useContext } from "react";
import { useEffect } from "react";
import { Question } from "./Question";
import {
  CurrentQuestionContext,
  CurrentQuestionNumberContext,
  CurrentSectionContext,
} from "../context";
import { AnswerContext } from "../context/AnswerContext";
import { QuestionStatusContext } from "../context/QuestionStatusContext";
import { QuestionDataContext } from "../context/QuestionDataContext";
import Summary from "./Summary";
import Calculator from "./Calculator";

const addScript = (url) => {
  const script = document.createElement("script");

  console.log("script added", called);
  script.src = url;
  script.async = true;

  document.body.appendChild(script);
};

let called = false;
const LeftMenu = () => {
  useEffect(() => {
    if (!called) {
      addScript("./Assessment Examination Center_files/calc.js");
      addScript("./Assessment Examination Center_files/calc2.js");
    }
    called = true;
    return () => {
      const calc = document.querySelectorAll("script[async]");
      console.log(calc);
    };
  }, []);
  const { data } = useContext(QuestionDataContext);
  const { currentQuestionNumber, setCurrentQuestionNumber } = useContext(
    CurrentQuestionNumberContext
  );
  const { currentSection, setCurrentSection } = useContext(
    CurrentSectionContext
  );
  const { currentQuestion, setCurrentQuestion } = useContext(
    CurrentQuestionContext
  );

  const [showSummary, setShowSummary] = useState(false);

  const { saveAnswerToStorage } = useContext(AnswerContext);
  const { saveQuestionStatus } = useContext(QuestionStatusContext);

  const saveAnswer = () => {
    const answerForm = document.querySelector("#gateAnswerForm");
    const formData = new FormData(answerForm);
    const answers = Object.fromEntries(formData.entries());
    let answer;
    if (
      currentQuestion.type === "Numerical" ||
      currentQuestion.type === "Multiple Choice"
    )
      answer = answers[currentQuestion.type];
    else {
      const keys = Object.keys(answers);
      keys.forEach((key) => {
        if (key.split("-")[0] === currentQuestion.type) {
          if (!answer) answer = answers[key];
          else answer += `,${answers[key]}`;
        }
      });
    }
    if (answer && answer.trim()) {
      saveAnswerToStorage(data.name, currentQuestion.post_id, answer);
      saveQuestionStatus(data.name, currentQuestion.post_id, "answered");
    }
    clearAnswer();
    return true;
  };

  const clearAnswer = () => {
    const answerForm = document.querySelector("#gateAnswerForm");
    answerForm.reset();
    document
      .querySelectorAll(".multipleAnswer")
      .forEach((i) => (i.checked = false));
    document
      .querySelectorAll('input[type="radio"]')
      .forEach((i) => (i.checked = false));
  };

  const handleMarkForReviewAndNext = () => {
    const answerForm = document.querySelector("#gateAnswerForm");
    const formData = new FormData(answerForm);
    const dataObj = Object.fromEntries(formData.entries());
    saveAnswer();
    if (dataObj.hasOwnProperty(currentQuestion.type))
      saveQuestionStatus(data.name, currentQuestion.post_id, "review_answered");
    else saveQuestionStatus(data.name, currentQuestion.post_id, "review");
    setCurrentQuestionNumber({
      id: Math.floor(Math.random() * 1000),
      num: currentQuestionNumber.num + 1,
    });
  };

  useEffect(() => {
    setCurrentQuestion(
      data.section[currentSection]["question"][currentQuestionNumber.num]
    );
  }, [currentQuestionNumber]);

  useEffect(() => {
    setCurrentQuestionNumber({ id: Math.floor(Math.random() * 1000), num: 0 });
  }, [currentSection]);

  useEffect(() => {
    document
      .querySelector("#finalSub")
      .addEventListener("click", () => setShowSummary(true));
  }, []);

  return (
    <div className="mainLeft">
      <div id="sectionsField">
        <fieldset>
          <legend>
            <span className="sect">Section</span>
          </legend>
          <div>
            <table width="100%">
              <tbody>
                <tr>
                  <td id="sections">
                    {data.section.map((sec, index) => {
                      return (
                        <div
                          className={`allSections ${
                            currentSection === index
                              ? "currentSectionSelected"
                              : null
                          }`}
                          id="s1"
                          key={sec["name"]}
                          onClick={() => setCurrentSection(index)}
                        >
                          <div
                            className={`tooltip  ${
                              currentSection === index
                                ? "tooltipSelected"
                                : null
                            }`}
                            id={`st${index}`}
                            onClick={() => setCurrentSection(index)}
                          >
                            <div
                              style={{
                                textOverflow: "ellipsis",
                                width: "90%",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                paddingLeft: 10,
                                cursor: "pointer",
                              }}
                            >
                              {sec["name"]}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </fieldset>
      </div>
      <div
        id="questionCont"
        style={{ display: showSummary ? "none" : "inherit" }}
      >
        {currentQuestion && (
          <Question
            ques={currentQuestion}
            ques_num={currentQuestionNumber.num + 1}
            // updateQuestion={updateQuestion}
          />
        )}
        <div id="actionButton">
          <div style={{ float: "left" }}>
            <input
              type="button"
              // onClick={saveAnswer}
              onClick={handleMarkForReviewAndNext}
              id="underreview"
              className="normalBtn button actionBn"
              defaultValue="Mark for Review & Next"
            />
          </div>
          <div style={{ float: "left" }}>
            <input
              type="button"
              id="clearResponse"
              onClick={clearAnswer}
              className="normalBtn button actionBn"
              defaultValue="Clear Response"
            />
          </div>
          <div style={{ float: "right" }}>
            <input
              type="button"
              id="savenext"
              onClick={async () => {
                await saveAnswer();
                setCurrentQuestionNumber({
                  id: Math.floor(Math.random() * 1000),
                  num: currentQuestionNumber.num + 1,
                });
              }}
              className="normalBtn button btnEnabled"
              defaultValue="Save & Next"
            />
          </div>
          <div style={{ float: "right" }}>
            <input
              type="button"
              id="ec_calculator"
              className="normalBtn button btnEnabled"
              defaultValue="Calculator"
            />
          </div>

          <div className="clear" />
        </div>
      </div>
      <Summary showSummary={showSummary} setShowSummary={setShowSummary} />
      <Calculator />
    </div>
  );
};

export default LeftMenu;
