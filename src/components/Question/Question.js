import { Button } from "antd";
import { useState } from "react";

const Question = ({ questions, score, setScore }) => {
  const [index, setIndex] = useState(0);
  const question = questions && questions[index].question;

  const backHandler = () => {
    setIndex((prevIndex) => prevIndex - 1);
  };

  const nextHandler = () => {
    setIndex((prevIndex) => prevIndex + 1);
  };

  const saveHandler = () => {};
  const skipHandler = () => {
    setIndex((prevIndex) => prevIndex + 1);
  };
  return (
    <div>
      <div>{question}</div>
      <div>
        {index > 0 ? (
          <Button onClick={backHandler}>Back</Button>
        ) : (
          <Button disabled>Back</Button>
        )}
        <Button onClick={nextHandler}>Next</Button>
        <Button onClick={saveHandler}>Save</Button>
        {index < questions.length - 1 ? (
          <Button onClick={nextHandler}>Next</Button>
        ) : (
          <Button disabled>Next</Button>
        )}
      </div>
    </div>
  );
};

export default Question;
