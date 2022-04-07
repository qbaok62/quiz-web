import "antd/dist/antd.min.css";
import { Row, Col, Divider, Button } from "antd";
import { Outlet, useNavigate, Link } from "react-router-dom";
import Logout from "../components/auth/logout";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../redux/auth/auth.selector";

const Navigation = () => {
  const accessToken = useSelector(selectAccessToken);
  const navigate = useNavigate();
  console.log(accessToken);

  return (
    <div>
      <Row justify="space-between" style={{ margin: "10px" }} align="middle">
        <Col>
          <div
            style={{
              color: "black",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            <span>Survey</span>
            <span style={{ color: "#1890ff" }}>Quiz</span>
          </div>
        </Col>
        <Col>
          {accessToken ? (
            <Logout />
          ) : (
            <Button onClick={() => navigate("/login")}>Login</Button>
          )}
        </Col>
      </Row>
      <Divider plain style={{ margin: "0" }}></Divider>
      <Outlet />
    </div>
  );
};

export default Navigation;
