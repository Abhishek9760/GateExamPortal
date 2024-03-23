import propTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { AnswerContext } from "../context/AnswerContext";
import { QuestionStatusContext } from "../context/QuestionStatusContext";
export const Question = ({ ques, ques_num }) => {
  const [selectCount, setSelectCount] = useState(0);
  const [answer, setAnswer] = useState("");
  const { answers } = useContext(AnswerContext);
  const { questionStatus, saveQuestionStatus } = useContext(
    QuestionStatusContext
  );

  useEffect(() => {
    let doc = new DOMParser().parseFromString(ques.text, "text/html");
    let element = doc.firstChild;
    if (ques.type !== "Numerical")
      setSelectCount(element.querySelector("ol").childElementCount);
  }, [ques]);

  useEffect(() => {
    if (!answers) return;
    // eslint-disable-next-line no-prototype-builtins
    if (answers.hasOwnProperty(ques.post_id)) {
      if (ques.type === "Numerical" || ques.type === "Multiple Choice")
        setAnswer(answers[ques.post_id]);
      else setAnswer(answers[ques.post_id].split(","));
    } else {
      if (answer) setAnswer("");
    }
  }, [ques, answers]);

  useEffect(() => {
    if (!questionStatus.hasOwnProperty(ques.post_id)) {
      saveQuestionStatus(ques.post_id, "not_answered");
    }
  }, [questionStatus, ques]);

  const config = {
    loader: { load: ["[tex]/html"] },
    tex: {
      packages: { "[+]": ["html"] },
      inlineMath: [
        ["$", "$"],
        ["\\(", "\\)"],
      ],
      displayMath: [
        ["$$", "$$"],
        ["\\[", "\\]"],
      ],
    },
  };

  return (
    <MathJaxContext config={config}>
      <div id="currentQues" style={{ overflow: "scroll" }}>
        <div className="questionTypeCont">
          <span className="contents">
            Question Type : <span id="quesType">{ques.type}</span>
          </span>
          <span className="marks">
            Marks for correct answer{" "}
            <font style={{ color: "green" }} id="quesAward">
              {ques.award}
            </font>
            ; Negative Marks{" "}
            <font style={{ color: "red" }} id="quesPenalty">
              {Math.round(ques.penality * 100) / 100}
            </font>
          </span>
        </div>
        <div id="quesOuterDiv">
          <div
            id="quesNumberDiv"
            style={{
              height: "6%",
              borderBottom: "1px solid #000000",
              margin: 5,
            }}
          >
            <div
              style={{
                float: "left",
                width: "49%",
                fontSize: "1em",
                fontFamily: "Arial,verdana,helvetica,sans-serif",
              }}
            >
              <b id="quesNumber">Question Number. {ques_num}</b>
            </div>
            <div style={{ width: "49%", float: "right" }} />
          </div>
          <form id="gateAnswerForm">
            <div id="quesContents" style={{ overflow: "auto" }}>
              <MathJax
                inline
                dynamic
                dangerouslySetInnerHTML={{ __html: ques.text }}
              />
              <div
                style={{
                  padding: "0 10px 20px 10px",
                  display: ques.type !== "Numerical" ? "none" : "block",
                }}
                id="numericAnswer"
              >
                <br />
                <input
                  name="Numerical"
                  type="text"
                  id="numericAnswerContent"
                  className="keyboardInput answer"
                  defaultValue={answer}
                  style={{ textAlign: "left", cursor: "text" }}
                />
              </div>
              <div
                id="choiceAnswer"
                style={{
                  display: ques.type !== "Multiple Choice" ? "none" : "block",
                }}
              >
                <table>
                  <tbody>
                    <tr>
                      {Array(selectCount)
                        .fill(null)
                        .map((_, index) => {
                          return (
                            <td key={index}>
                              <input
                                key={Math.random()}
                                defaultChecked={
                                  ques.type === "Multiple Choice"
                                    ? answer
                                      ? answer == index + 1
                                      : false
                                    : false
                                }
                                type="radio"
                                className="answer"
                                name="Multiple Choice"
                                defaultValue={index + 1}
                              />
                              <span>{String.fromCharCode(index + 1 + 64)}</span>
                            </td>
                          );
                        })}
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                id="multipleAnswer"
                style={{
                  display: ques.type !== "Multiple Select" ? "none" : "block",
                }}
              >
                <table>
                  <tbody>
                    <tr>
                      {Array(selectCount)
                        .fill(null)
                        .map((_, index) => {
                          return (
                            <td key={index}>
                              <input
                                key={Math.random()}
                                defaultChecked={
                                  ques.type === "Multiple Select"
                                    ? typeof answer !== "string"
                                      ? answer.findIndex(
                                          (i) => i == index + 1
                                        ) !== -1
                                      : false
                                    : false
                                }
                                type="checkbox"
                                className="multipleAnswer"
                                name={`Multiple Select-${index}`}
                                defaultValue={index + 1}
                              />
                              <span>{String.fromCharCode(index + 1 + 64)}</span>
                            </td>
                          );
                        })}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </form>
        </div>
      </div>
    </MathJaxContext>
  );
};

Question.propTypes = {
  ques: propTypes.object,
  ques_num: propTypes.number.isRequired,
};
