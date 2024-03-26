import { useLocation, useParams } from "react-router-dom";
import "./Result.css";
import React, { useContext, useEffect, useState } from "react";
import { QuestionDataContext } from "../context/QuestionDataContext";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { QuestionStatusContext } from "../context/QuestionStatusContext";

const Result = () => {
  const { state } = useLocation();
  const { data } = useContext(QuestionDataContext);
  const { questionStatus } = useContext(QuestionStatusContext);
  const [answers, setAnswers] = useState();

  useEffect(() => {
    let ans = localStorage.getItem(`${data?.name}-answer`);
    if (ans) {
      ans = JSON.parse(ans)?.answer;
      if (ans) setAnswers(ans);
    }
  }, []);
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
      <div className="res_content">
        <div className="exam_summary">
          <div className="exam_name">
            <h2>
              <a href="/">Exam Summary ({state.examName})</a>
            </h2>
          </div>
          <div className="exam_response_status-1 res-col">
            <div className="exam_table_item exam_num_attempted">
              <p className="exam_qs_title">Qs. Attempted: </p>
              <p className="res_num">
                <span className="exam_num_item">{state.questionAttempted}</span>
                <span className="exam_result_header">
                  {/* <span className="exam_result_header_one" title="1 Mark">
                  {" "}
                  1
                </span>
                +{" "}
                <span className="exam_result_headrer_two" title="2 Marks">
                  {" "}
                  0
                </span> */}
                </span>
              </p>
            </div>
            <div className="exam_table_item exam_num_correct">
              <p className="exam_qs_title">Correct Attempts: </p>
              <p className="res_num">
                <span className="exam_num_item">{state.correctAttempts}</span>
                <span className="exam_result_header">
                  {/* <span className="exam_result_header_one" title="1 Mark">
                  {" "}
                  1
                </span>
                +{" "}
                <span className="exam_result_headrer_two" title="2 Marks">
                  {" "}
                  0
                </span> */}
                </span>
              </p>
            </div>
            <div className="exam_table_item exam_num_incorrect">
              <p className="exam_qs_title">Incorrect Attempts: </p>
              <p className="res_num">
                <span className="exam_num_item">{state.incorrectAttempts}</span>
                <span className="exam_result_header">
                  {/* <span className="exam_result_header_one" title="1 Mark">
                  0
                </span>
                +{" "}
                <span className="exam_result_headrer_two" title="2 Marks">
                  {" "}
                  0
                </span> */}
                </span>
              </p>
            </div>
          </div>
          <div className="exam_response_status-2 res-col">
            <div className="exam_table_item exam_correct_marks">
              <p className="exam_qs_title">Correct Marks: </p>
              <p className="res_num">
                <span className="exam_num_item">{state.correctMarks}</span>
                <span className="exam_result_header">
                  {/* <span className="exam_result_header_one" title="1 Mark">
                  1
                </span>
                +{" "}
                <span className="exam_result_headrer_two" title="2 Marks">
                  {" "}
                  0
                </span> */}
                </span>
              </p>
            </div>
            <div className="exam_table_item exam_penalty_marks">
              <p className="exam_qs_title">Penalty Marks: </p>
              <p className="res_num">
                <span className="exam_num_item">
                  {Math.round(state.penalityMarks * 100) / 100}
                </span>
              </p>
            </div>
            <div className="exam_table_item exam_result_marks">
              <p className="exam_qs_title">Resultant Marks: </p>
              <p className="res_num">
                <span className="exam_num_item">
                  {Math.round(state.resultantMarks * 100) / 100}
                </span>
                {/* <span className="exam_result_header">
                <span className="exam_result_header_one" title="1 Mark">
                  {" "}
                  1
                </span>
                +{" "}
                <span className="exam_result_headrer_two" title="2 Marks">
                  {" "}
                  0
                </span>
              </span> */}
              </p>
            </div>
          </div>
          <div className="exam_meta res-col">
            <div className="exam_table_item exam_num_qs">
              <p className="exam_qs_title">Total Questions:</p>
              <p className="res_num">
                <span className="exam_num_item">{state.totalQuestion}</span>
              </p>
            </div>
            <div className="exam_table_item exam_total_marks">
              <p className="exam_qs_title">Total Marks:</p>
              <p className="res_num">
                <span className="exam_num_item">{state.totalMarks}</span>
                {/* <span className="exam_result_header">
                <span className="exam_result_header_one" title="1 Mark">
                  10
                </span>
                +{" "}
                <span className="exam_result_headrer_two" title="2 Marks">
                  {" "}
                  40
                </span>
              </span> */}
              </p>
            </div>
            <div className="exam_table_item exam_duration">
              <p className="exam_qs_title">Exam Duration:</p>
              <p className="res_num">
                <span className="exam_min_duration">
                  {state.examDuration} Minutes
                </span>
              </p>
            </div>
            <div className="exam_table_item exam_time_taken">
              <p className="exam_qs_title">Time Taken: </p>
              <p className="res_num">
                <span className="exam_min_taken">
                  {Math.round(state.timeTaken * 100) / 100} Minutes
                </span>
              </p>
            </div>
          </div>
        </div>
        <div id="exam_result_section_choice">
          <span
            className="exam_result_section_choice_span badge badge-primary"
            id="exam_result_section_choice_response"
          >
            Exam Response
          </span>
          <span
            className="exam_result_section_choice_span badge badge-primary"
            id="exam_result_section_choice_stats"
          >
            Exam Stats
          </span>
          <span
            className="exam_result_section_choice_span badge badge-primary"
            id="exam_result_section_choice_feedback"
          >
            Feedback{" "}
          </span>
        </div>

        <div id="exam_result_section_response">
          {data.section.map((section) => {
            return (
              <div className="res_section" key={section["name"]}>
                <h2>{section?.name}</h2>

                <div className="res_question">
                  {section.question.map((ques, index) => {
                    return (
                      <React.Fragment key={ques.post_id}>
                        <div className="res_qs_meta">
                          <span className="res_qs_top_meta1 res_qs_num badge badge-secondary">
                            <b>Q #{index + 1}</b>
                          </span>
                          <span className="res_qs_top_meta1 res_qs_type badge badge-secondary">
                            {ques.type}
                          </span>
                          <span className="res_qs_top_meta1 res_qs_marks badge badge-secondary">
                            Award: {ques.award}
                          </span>
                          <span className="res_qs_top_meta1 res_qs_penalty badge badge-secondary">
                            {Math.round(ques.penalty * 100) / 100}
                          </span>
                          {/* <span className="res_qs_top_meta1 res_qs_category badge badge-secondary">
                            Combinatory
                          </span> */}
                        </div>
                        <div className="res_question_text">
                          <MathJax
                            inline
                            dynamic
                            dangerouslySetInnerHTML={{ __html: ques.text }}
                          />
                        </div>
                        <div className="res_solution">
                          <span className="res_qs_bottom_meta1 user_solution badge badge-primary">
                            Your Answer:{" "}
                            {answers && answers[ques.post_id]
                              ? answers[ques.post_id]
                              : null}
                          </span>
                          <span className="res_qs_bottom_meta1 correct_solution badge badge-primary">
                            Correct Answer: {ques.answer}
                          </span>
                          <span className="res_qs_bottom_meta1 res_status res_status_not_attempted badge badge-primary">
                            {questionStatus && questionStatus[ques.post_id]
                              ? questionStatus[ques.post_id]
                              : "Not Attempted"}
                          </span>
                          <span className="res_qs_bottom_meta1 res_discuss">
                            <a
                              href={`https://gateoverflow.in/${ques.post_id}`}
                              className="badge badge-primary"
                              target="_blank"
                            >
                              Discuss
                            </a>
                          </span>
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MathJaxContext>
  );
};

export default Result;
