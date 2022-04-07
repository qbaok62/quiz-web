import { Col, Row, Spin } from "antd";
import { useSelector } from "react-redux";
import Question from "../components/question/question";
import {
  selectCurrentQuestion,
  selectLoading,
} from "../redux/question/question.selector";

const QuizPage = () => {
  const loading = useSelector(selectLoading);
  const questions = useSelector(selectCurrentQuestion);

  if (loading)
    return (
      <Row justify="center">
        <Spin size="large" />
      </Row>
    );

  return (
    <Row align="middle" style={{ marginTop: "24px" }}>
      <Col span={12} offset={6}>
        <Question questions={questions} />
      </Col>
    </Row>
  );
};

export default QuizPage;
