import axios from "../api/axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Question from "../components/Question/Question";

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    let mounted = true;
    axios
      .get("/v1/questions", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        if (mounted) {
          setQuestions(res.data.results);
        }
      });

    return () => {
      mounted = false;
    };
  }, [accessToken]);

  console.log(questions);

  return (
    <div>{questions.length > 0 && <Question questions={questions} />}</div>
  );
};

export default QuizPage;
