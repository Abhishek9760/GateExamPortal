import { useContext } from "react";
import { QuestionDataContext } from "../context/QuestionDataContext";
import { Button, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

const ExamList = ({ activeItem, data }) => {
  const navigate = useNavigate();
  const { setData } = useContext(QuestionDataContext);
  if (!activeItem) {
    return data
      .sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
      .map((i) => (
        <div key={i["name"]}>
          <Button
            icon
            labelPosition="left"
            basic
            compact
            onClick={async () => {
              setData(i);
              navigate("/home");
            }}
          >
            <Icon name="lock open" />

            {i["name"]}
          </Button>
        </div>
      ));
  }
  return (
    data &&
    data[activeItem]
      .sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
      .map((i) => (
        <div key={i["name"]}>
          <Button
            icon
            labelPosition="left"
            basic
            compact
            onClick={async () => {
              setData(i);
              navigate("/home");
            }}
          >
            <Icon name="lock open" />

            {i["name"]}
          </Button>
        </div>
      ))
  );
};

export default ExamList;
