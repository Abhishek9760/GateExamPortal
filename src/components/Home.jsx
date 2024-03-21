import { useContext, useState } from "react";
import { QuestionDataContext } from "../context/QuestionDataContext";
import json5 from "json5";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // const [fileContent, setFileContent] = useState("");
  const { setData } = useContext(QuestionDataContext);
  const navigate = useNavigate();

  const handleFileRead = (e) => {
    const content = e.target.result;
    const htmlText = stringToDOM(content);
    let data = htmlText.querySelector("script").text;
    data = new Function(`${data};return data`)();
    setData(data);
    navigate("/home");
  };

  function stringToDOM(str) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, "text/html");
    return doc.body; // Assuming you only want the first element
  }

  const handleFileChosen = (file) => {
    const reader = new FileReader();
    reader.onloadend = handleFileRead;
    reader.readAsText(file);
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => handleFileChosen(e.target.files[0])}
      />
    </div>
  );

  // return <h1>Home</h1>;
};

export default Home;
