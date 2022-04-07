import style from "./question.module.css";
import { Button, Col, Divider, message, Row } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentAnswer } from "../../redux/answer/answerselector";
import { saveAnswer } from "../../redux/answer/answer.reducer";
import {
  selectAccessToken,
  selectSubmitLoading,
} from "../../redux/auth/auth.selector";
import { submitAnswer } from "../../redux/auth/auth.action";

const Question = ({ questions }) => {
  const [clicked, setClicked] = useState(false);
  const [selected, setSelected] = useState();
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitLoading = useSelector(selectSubmitLoading);
  const accessToken = useSelector(selectAccessToken);
  const userAnswers = useSelector(selectCurrentAnswer);
  const question = questions && questions[index];
  const answerId = questions && question.id;
  const serverAnswers = [
    question.answer1,
    question.answer2,
    question.answer3,
    question.answer4,
  ];

  useEffect(() => {
    setSelected("");
  }, [index]);

  const handleCheck = (i) => {
    setSelected(i);
    setClicked(true);
  };

  const saveHandler = () => {
    if (selected === "") {
      message.error("You have to choose the answer");
    } else {
      dispatch(saveAnswer({ id: answerId, answer: selected }));
      setClicked(false);
      if (index < questions.length - 1) {
        setIndex((prevIndex) => prevIndex + 1);
      } else {
        dispatch(submitAnswer(userAnswers, accessToken, navigate));
      }
    }
  };

  const backHandler = () => {
    setIndex((prevIndex) => prevIndex - 1);
    setClicked(false);
  };

  const skipHandler = () => {
    setIndex((prevIndex) => prevIndex + 1);
    setClicked(false);
  };

  return (
    <div>
      <p>
        Question {index + 1}/{questions.length}
      </p>
      <div>
        <div className={style.question}>{question.question}</div>
        <Row gutter={[16, 16]}>
          {questions &&
            serverAnswers.map((i) => {
              return (
                <Col key={i} span={12}>
                  <Button
                    key={i}
                    className={style.button}
                    type={
                      (questions &&
                        !clicked &&
                        i === userAnswers[index]?.correctanswer) ||
                      selected === i
                        ? "primary"
                        : "default"
                    }
                    onClick={() => handleCheck(i)}
                  >
                    {i}
                  </Button>
                </Col>
              );
            })}
        </Row>
      </div>
      <Divider />
      <Row justify="space-between">
        <Button onClick={backHandler} disabled={!index}>
          Back
        </Button>
        <Button onClick={saveHandler} loading={submitLoading}>
          {index < questions.length - 1 ? "Save and Next" : "Submit"}
        </Button>
        <Button onClick={skipHandler} disabled={index === questions.length - 1}>
          Skip
        </Button>
      </Row>
    </div>
  );
};

export default Question;
