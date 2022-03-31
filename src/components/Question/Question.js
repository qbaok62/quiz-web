import { useState } from "react";

const Question = ({ questions }) => {
  const [index, setIndex] = useState(0);
  const question = questions && questions[0].question;
  return <div>{question}</div>;
};

export default Question;
