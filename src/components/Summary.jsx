import { useContext, useRef, useState } from "react";
import { QuestionDataContext } from "../context/QuestionDataContext";
import { useNavigate } from "react-router-dom";
import { CurrentSectionContext } from "../context/currentSectionContext";
import { Button } from "semantic-ui-react";

const Summary = ({ showSummary, setShowSummary }) => {
  const { data } = useContext(QuestionDataContext);
  const [isLoading, setIsLoading] = useState(false);
  // const { currectSection } = useContext(CurrentSectionContext);
  const navigate = useNavigate();

  const sumArrays = (arr) => {
    const arr1 = arr[0].slice(1, 7);
    let arr2 = new Array(6).fill(0);
    if (arr.length > 1) arr2 = arr[1].slice(1, 7);
    const zipped = arr1.map((x, i) => [x, arr2[i]]);

    return zipped.map(([x, y]) => x + y);
  };

  function convertNumbersToLetters(numberString) {
    const asciiOffset = 97; // ASCII code for 'a' (lowercase)
    const letters = numberString
      .split(",") // Split the string by commas
      .map((number) => String.fromCharCode(Number(number) + asciiOffset - 1)) // Convert numbers to letters
      .join(";"); // Join the letters with semicolons

    return letters;
  }

  const submitExamResult = async () => {
    await setIsLoading(true);
    const questionAttempted = document.querySelectorAll(
      "#quesNavPanel0 span.answered"
    ).length;
    let totalQuestion = 0;
    data.section.forEach((sec) => {
      totalQuestion += sec.question.length;
    });
    let answers = localStorage.getItem("answers");
    let correctAttempts = 0;
    let incorrectAttempts = 0;
    let correctMarks = 0;
    let penalityMarks = 0;
    let examDuration = data.duration;
    let timeTaken = document.querySelector("#timeInMins").textContent;
    const totalMarks = data.total_marks;
    if (answers) {
      const parsedAnswers = JSON.parse(answers);
      data.section.map((section) =>
        section.question.map((ques) => {
          if (ques.post_id in parsedAnswers) {
            if (
              ques.type === "Multiple Choice" ||
              ques.type === "Multiple Select"
            ) {
              const newAnswer = parsedAnswers[ques.post_id];
              const finalAnswer = convertNumbersToLetters(newAnswer);
              if (finalAnswer === ques.answer?.toLowerCase()) {
                correctAttempts += 1;
                correctMarks += ques.award;
              } else {
                incorrectAttempts += 1;
                penalityMarks += parseFloat(ques.penalty);
              }
            } else {
              if (parsedAnswers[ques.post_id].trim() == ques.answer) {
                correctAttempts += 1;
                correctMarks += ques.award;
              } else {
                incorrectAttempts += 1;
                penalityMarks += parseFloat(ques.penalty);
              }
            }
          }
        })
      );
    }
    const resultantMarks = correctMarks - penalityMarks;
    await setIsLoading(false);

    navigate("/result", {
      state: {
        questionAttempted,
        totalQuestion,
        correctAttempts,
        incorrectAttempts,
        totalMarks,
        correctMarks,
        penalityMarks,
        timeTaken,
        examDuration,
        resultantMarks,
        examName: data.name,
      },
    });
  };

  const getSectionSummary = () => {
    let summaryData = [];
    data.section.map((sec, index) => {
      summaryData.push([sec.name]);
      const ans = summaryData[index];
      ans.push(sec.question.length);
      ans.push(
        document.querySelectorAll("#quesNavPanel0 span.answered").length
      );
      ans.push(
        document.querySelectorAll("#quesNavPanel0 span.not_answered").length
      );
      ans.push(document.querySelectorAll("#quesNavPanel0 span.review").length);
      ans.push(
        document.querySelectorAll("#quesNavPanel0 span.review_answered").length
      );
      ans.push(
        document.querySelectorAll("#quesNavPanel0 span.not_visited").length
      );
    });

    const totalSummary = sumArrays(summaryData);

    return summaryData.map((section, index) => {
      return (
        <>
          <tr key={section[0]}>
            {section.map((row, i) => (
              <td width="13%" key={i}>
                {row}
              </td>
            ))}
          </tr>
          {summaryData.length - 1 === index && (
            <tr>
              <td>Total</td>
              {totalSummary.map((row, i) => (
                <td key={i}>{row}</td>
              ))}
            </tr>
          )}
        </>
      );
    });
  };
  return (
    <div
      id="sectionSummaryDiv"
      style={{ overflow: "hidden", display: showSummary ? "block" : "none" }}
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
          <tbody id="group_summary">
            <tr>
              <th>Section Name</th>
              <th>No. of Questions</th>
              <th>Answered</th>
              <th>Not Answered</th>
              <th>Marked for Review</th>
              <th>Answered and Marked for Review</th>
              <th>Not Visited</th>
            </tr>
            {getSectionSummary()}
          </tbody>
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
                <Button
                  loading={isLoading}
                  type="button"
                  onClick={submitExamResult}
                >
                  Yes
                </Button>
              </td>
              <td style={{ textAlign: "center" }}>
                <Button type="button" onClick={() => setShowSummary(false)}>
                  No
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
        <div />
      </div>
    </div>
  );
};

export default Summary;
