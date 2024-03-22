import { useContext, useEffect, useState } from "react";
import { QuestionDataContext } from "../context/QuestionDataContext";
import { useNavigate } from "react-router-dom";
import {
  MenuMenu,
  MenuItem,
  Input,
  Menu,
  Segment,
  Button,
} from "semantic-ui-react";

const Home = () => {
  const { data, setData } = useContext(QuestionDataContext);
  const [activeItem, setActiveItem] = useState("2021");
  const navigate = useNavigate();

  const handleItemClick = (e, { name }) => setActiveItem(name);

  // useEffect(() => {
  //   localStorage.clear();
  // }, []);

  return (
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

        <MenuMenu position="right">
          <MenuItem>
            <Input icon="search" placeholder="Search..." />
          </MenuItem>
        </MenuMenu>
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
                  basic
                  compact
                  onClick={async () => {
                    setData(i);
                    navigate("/home");
                  }}
                >
                  {i["name"]}
                </Button>
              </div>
            ))}
      </Segment>
    </div>
  );
};

export default Home;
