import { useContext, useEffect, useState, useRef } from "react";
import {
  CurrentSectionContext,
  CurrentQuestionNumberContext,
} from "../context";
import { QuestionStatusContext } from "../context/QuestionStatusContext";
import { QuestionDataContext } from "../context/QuestionDataContext";

export const RightMenu = () => {
  const { data } = useContext(QuestionDataContext);
  const { currentSection } = useContext(CurrentSectionContext);
  const { setCurrentQuestionNumber, currentQuestionNumber } = useContext(
    CurrentQuestionNumberContext
  );
  const { questionStatus } = useContext(QuestionStatusContext);

  const [timeLeft, setTimeLeft] = useState(data ? data.duration * 60 : 0); // Initial time in seconds (3 hours)
  const intervalRef = useRef(null);

  const [totalAnswered, setTotalAnswered] = useState(0);
  const [notAnswered, setNotAnswered] = useState(0);
  const [notVisited, setNotVisited] = useState(0);

  useEffect(() => {
    const answers = localStorage.getItem("answers");
    const status = localStorage.getItem("status");

    if (answers) {
      const storedQuestions = new Set(Object.keys(JSON.parse(answers)));
      const totalQuestionsCount = data.section[currentSection].question.filter(
        (element) => storedQuestions.has(element.post_id)
      ).length;
      setTotalAnswered(totalQuestionsCount);
    }
    if (status) {
      const parsedStatus = JSON.parse(status);
      const totalNotAnswered = data.section[currentSection].question.filter(
        (element) => parsedStatus[element.post_id] === "not_answered"
      ).length;
      setNotAnswered(totalNotAnswered);

      const totalNotVisited = data.section[currentSection].question.filter(
        (element) => parsedStatus[element.post_id] === "not_visited"
      ).length;

      setNotVisited(totalNotVisited);
    }
  }, [currentQuestionNumber]);

  const startTimer = () => {
    if (intervalRef.current) return;

    console.log("running");
    intervalRef.current = setInterval(() => {
      console.log(timeLeft);
      if (timeLeft > 0) {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      } else {
        clearInterval(intervalRef.current);
        intervalRef.current = null; // Clear interval reference
      }
    }, 1000); // Update every second
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current); // Cleanup on unmount
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const secondsLeft = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secondsLeft.toString().padStart(2, "0")}`;
  };

  return (
    <div className="mainRight mainRightQuiz">
      <div id="examNavButton" />
      <div id="timer" style={{ height: 90 }}>
        <div id="timerLeftSideDiv">
          <div id="candImg">
            <center>
              <img
                id="candidateImg"
                height="50px"
                width="70px"
                src="./Assessment Examination Center_files/NewCandidateImage.jpg"
              />
            </center>
          </div>
        </div>
        <div
          id="timerRightSideDiv"
          style={{
            width: "50%",
            float: "left",
            paddingTop: 7,
            paddingBottom: 7,
          }}
        >
          <div style={{ height: 50 }}>
            <div style={{ paddingTop: 8, width: "100%" }} id="showTime">
              <b>
                Time Left :
                <span id="timeInMins" onClick={startTimer}>
                  {formatTime(timeLeft)}
                </span>
              </b>
            </div>
            <div style={{ width: "100%" }}>
              <i className="candOriginalName candidateName">Guest</i>
            </div>
          </div>
        </div>
      </div>
      <div className="numberpanel">
        <div>
          <span id="viewingSect">You are viewing</span>&nbsp;
          <b id="viewSection">{currentSection ? "Technical" : "Aptitude"}</b>
          &nbsp;
          <span className="sect">Section</span>
        </div>
        <div id="quesPallet">Question Palette</div>
        <div id="numberpanelQues">
          <center>
            <table
              style={{ marginTop: "-2%" }}
              cellSpacing={0}
              id="question_area"
              cellPadding={0}
              border={0}
            >
              <tbody id="quesNavPanel0">
                {Array(
                  Math.ceil(data.section[currentSection].question.length / 4)
                )
                  .fill(null)
                  .map((_, rows) => {
                    return (
                      <tr key={rows}>
                        {Array(4)
                          .fill(null)
                          .map((_, cols) => {
                            const index = rows * 4 + cols;
                            if (
                              data.section[currentSection].question[index] !==
                              undefined
                            ) {
                              return (
                                <td
                                  id={`qtd${index + 1}`}
                                  key={`${rows}${cols}`}
                                  onClick={() =>
                                    setCurrentQuestionNumber({
                                      id: Math.floor(Math.random() * 1000),
                                      num: index,
                                    })
                                  }
                                >
                                  <span
                                    title="Not Answered"
                                    className={`${
                                      questionStatus.hasOwnProperty(
                                        data.section[currentSection].question[
                                          index
                                        ].post_id
                                      )
                                        ? questionStatus[
                                            data.section[currentSection]
                                              .question[index].post_id
                                          ]
                                        : "not_visited"
                                    } button_item`}
                                    id={`nvi${rows}`}
                                  >
                                    {index + 1}
                                  </span>
                                </td>
                              );
                            } else return null;
                          })}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </center>
        </div>
        <div id="legend" style={{ marginLeft: 3, margin: 5 }}>
          <table width="100%" className="diff_type_notation_area_inner">
            <tbody>
              <tr>
                <td colSpan={4}>
                  <b>
                    <label id="legendLabel">Legend</label>
                  </b>
                </td>
              </tr>
              <tr>
                <td>
                  <span
                    id="exam-answered-count"
                    className="answered_small button_item"
                  >
                    {totalAnswered}
                  </span>
                </td>
                <td>
                  <label id="answeredLabel">Answered</label>
                </td>
                <td>
                  <span
                    id="exam-not-answered-count"
                    className="not_answered_small button_item"
                  >
                    {notAnswered}
                  </span>
                </td>
                <td>
                  <label id="notAnsweredLabel">Not Answered</label>
                </td>
              </tr>
              <tr>
                <td>
                  <span
                    id="exam-not-visited-count"
                    className="not_visited_small button_item"
                  >
                    {notVisited}
                  </span>
                </td>
                <td>
                  <label id="notVisitedLabel">Not Visited</label>
                </td>
                <td>
                  <span
                    id="exam-marked-count"
                    className="review_small button_item"
                  >
                    0
                  </span>
                </td>
                <td>
                  <label id="markedLabel">Marked for Review</label>
                </td>
              </tr>
              <tr>
                <td>
                  <span
                    id="exam-marked-answered-count"
                    className="review_answered_small button_item"
                  >
                    0
                  </span>
                </td>
                <td>
                  <label id="markedAnsweredLabel">
                    Answered &amp; Marked for Review (will be considered for
                    evaluation)
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
          <table width="100%">
            <tbody>
              <tr>
                <td width="50%">
                  <center>
                    {" "}
                    <input
                      type="button"
                      id="viewProButton"
                      className="button1"
                      defaultValue="Profile"
                      title="View Profile"
                      //   onclick="WebApp.DisplayExamPage('profile');"
                    />{" "}
                  </center>
                </td>
                <td width="50%">
                  <center>
                    <input
                      type="button"
                      id="viewInstructionsButton"
                      className="button1"
                      defaultValue="Instructions"
                      title="View Instructions"
                      //   onclick="WebApp.DisplayExamPage('instructions');"
                    />{" "}
                  </center>
                </td>
              </tr>
              <tr>
                <td id="viewQPTD">
                  <center>
                    {" "}
                    <input
                      id="viewQPButton"
                      type="button"
                      className="button1"
                      defaultValue="Question Paper"
                      title="View Entire Question Paper"
                      //   onclick="WebApp.DisplayExamPage('questions');"
                    />{" "}
                  </center>
                </td>
                <td id="submitTD">
                  <center>
                    <input
                      type="button"
                      className="button1"
                      id="finalSub"
                      //   onclick="WebApp.DisplayExamPage('summary');"
                      defaultValue="Submit"
                      title="Submit Group"
                    />
                  </center>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
