import { useContext, useState } from "react";
import { QuestionDataContext } from "../context/QuestionDataContext";
import { useNavigate } from "react-router-dom";
import { MenuItem, Menu, Segment, Button, Icon } from "semantic-ui-react";
import Login from "./Login";

const Home = () => {
  const { data, setData } = useContext(QuestionDataContext);
  const [activeItem, setActiveItem] = useState("2021");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const clearExamData = () => {
    const isTrue = confirm("Are you sure?");
    if (isTrue) {
      localStorage.clear();
      window.location.href = "/";
    }
  };

  return isLoggedIn ? (
    <div>
      <Menu pointing>
        <MenuItem
          name="2021"
          active={activeItem === "2021"}
          onClick={handleItemClick}
        />
        <MenuItem
          name="2022"
          active={activeItem === "2022"}
          onClick={handleItemClick}
        />
        <MenuItem
          name="2023"
          active={activeItem === "2023"}
          onClick={handleItemClick}
        />
        <MenuItem
          name="2024"
          active={activeItem === "2024"}
          onClick={handleItemClick}
        />
        <MenuItem
          name="other"
          active={activeItem === "other"}
          onClick={handleItemClick}
        />
        <MenuItem
          position="right"
          name="Clear Exam Data"
          onClick={clearExamData}
        />
      </Menu>

      <Segment>
        {data &&
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
                    // localStorage.clear();
                    // setTimeout(() => {
                    setData(i);
                    navigate("/home");
                    // }, 1000);
                  }}
                >
                  <Icon name="lock" />

                  {i["name"]}
                </Button>
              </div>
            ))}
      </Segment>
    </div>
  ) : (
    <Login setIsLoggedIn={setIsLoggedIn} />
  );
};

export default Home;
