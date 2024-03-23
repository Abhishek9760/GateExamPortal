import { useContext } from "react";
import { QuestionDataContext } from "../context/QuestionDataContext";

const Summary = ({ showSummary, setShowSummary }) => {
  const { data } = useContext(QuestionDataContext);

  const sumArrays = (arr) => {
    const arr1 = arr[0].slice(1, 7);
    let arr2 = new Array(6).fill(0);
    if (arr.length > 1) arr2 = arr[1].slice(1, 7);
    const zipped = arr1.map((x, i) => [x, arr2[i]]);

    return zipped.map(([x, y]) => x + y);
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
                <input
                  // onclick="WebApp.SubmitResults();"
                  type="button"
                  className="button"
                  defaultValue="Yes"
                  onClick={() => navigate("/result")}
                />
              </td>
              <td style={{ textAlign: "center" }}>
                <input
                  // onclick="WebApp.DisplayExamPage('active');"
                  type="button"
                  className="button"
                  defaultValue="No"
                  onClick={() => setShowSummary(false)}
                />
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
