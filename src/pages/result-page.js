import { Typography, Button, Col, Progress, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { retry } from "../redux/answer/answer.reducer";
import { selectScore, selectUser } from "../redux/auth/auth.selector";

const { Title } = Typography;
const ResultPage = () => {
  const user = useSelector(selectUser);
  const score = useSelector(selectScore);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const retryHandler = () => {
    dispatch(retry());
  };

  const backHandler = () => {
    navigate(-1);
  };
  console.log(user);
  return (
    <div>
      <Row justify="center">
        <Col>
          <Title>YOUR RESULT</Title>
          <Row justify="center">
            <Progress
              type="circle"
              strokeColor={{
                "0%": "#108ee9",
                "100%": "#87d068",
              }}
              percent={score * 10}
            />
          </Row>
          <Row justify="center">
            <Button onClick={backHandler}>BACK</Button>
            <Button onClick={retryHandler}>RETRY</Button>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ResultPage;
