import { useState, useContext } from "react";
import { data } from "../data";
import { useEffect } from "react";
import { Question } from "./Question";
import {
  CurrentQuestionContext,
  CurrentQuestionNumberContext,
  CurrentSectionContext,
} from "../context";
import { AnswerContext } from "../context/AnswerContext";
import { QuestionStatusContext } from "../context/QuestionStatusContext";

const LeftMenu = () => {
  const { currentQuestionNumber, setCurrentQuestionNumber } = useContext(
    CurrentQuestionNumberContext
  );
  const { currentSection, setCurrentSection } = useContext(
    CurrentSectionContext
  );
  const { currentQuestion, setCurrentQuestion } = useContext(
    CurrentQuestionContext
  );

  const { setAnswers, answers } = useContext(AnswerContext);
  const { saveQuestionStatus } = useContext(QuestionStatusContext);

  const saveAnswerToStorage = (postId, answer) => {
    const answers = localStorage.getItem("answers");
    if (!answers) {
      localStorage.setItem("answers", JSON.stringify({ [postId]: answer }));
    } else {
      const answersObj = JSON.parse(answers);
      answersObj[postId] = answer;
      localStorage.setItem("answers", JSON.stringify(answersObj));
      setAnswers(answersObj);
    }
    saveQuestionStatus(currentQuestion.post_id, "answered");
  };
  const saveAnswer = () => {
    const answerForm = document.querySelector("#gateAnswerForm");
    const data = new FormData(answerForm);
    const answers = Object.fromEntries(data.entries());
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
    if (answer && answer.trim())
      saveAnswerToStorage(currentQuestion.post_id, answer);
    clearAnswer();
    return true;
  };

  const clearAnswer = () => {
    const answerForm = document.querySelector("#gateAnswerForm");
    answerForm.reset();
  };

  const handleMarkForReviewAndNext = () => {
    const answerForm = document.querySelector("#gateAnswerForm");
    const formData = new FormData(answerForm);
    const data = Object.fromEntries(formData.entries());
    saveAnswer();
    if (data.hasOwnProperty(currentQuestion.type))
      saveQuestionStatus(currentQuestion.post_id, "review_answered");
    else saveQuestionStatus(currentQuestion.post_id, "review");
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
      <div id="questionCont">
        <Question
          ques={currentQuestion}
          ques_num={currentQuestionNumber.num + 1}
          // updateQuestion={updateQuestion}
        />
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
              onClick={() => {
                saveAnswer();
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
      <div
        id="sectionSummaryDiv"
        style={{ display: "none", overflow: "hidden" }}
      >
        <div className="examSummaryHeader">
          <span style={{ fontSize: 16, fontWeight: "bold" }}>Exam Summary</span>
        </div>
        <div style={{ overflow: "auto", textAlign: "center" }}>
          <table
            className="bordertable"
            cellSpacing={0}
            width="80%"
            align="center"
            style={{ marginTop: "5%" }}
          >
            <tbody id="group_summary" />
          </table>
        </div>
        <div id="confirmation_buttons" className="buttonDiv">
          <table align="center">
            <tbody>
              <tr>
                <td colSpan={2}>Are you sure you want to submit the Exam?</td>
              </tr>
              <tr>
                <td style={{ textAlign: "center" }}>
                  <input
                    // onClick="WebApp.SubmitResults();"
                    type="button"
                    className="button"
                    defaultValue="Yes"
                  />
                </td>
                <td style={{ textAlign: "center" }}>
                  <input type="button" className="button" defaultValue="No" />
                </td>
              </tr>
            </tbody>
          </table>
          <div />
        </div>
      </div>
    </div>
  );
};

export default LeftMenu;
