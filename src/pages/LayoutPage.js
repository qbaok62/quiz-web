import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/auth/auth.middleware";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import "antd/dist/antd.min.css";
import { Row, Col, Divider, Button, Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";

const LayoutPage = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const refreshToken = useSelector((state) => state.auth.refreshToken);
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logout(refreshToken));
  };

  const homeHandler = () => {
    if (isLoggedIn) {
      navigate("/quiz", { replace: true });
    }
  };

  const userHandler = () => {
    navigate("/user", { replace: true });
  };

  return (
    <Row align="middle">
      <Col span={14} offset={5}>
        <Row justify="space-between" style={{ margin: "8px 0" }} align="middle">
          <Col>
            <div
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={homeHandler}
            >
              <span>Survey</span>
              <span style={{ color: "blue" }}>Quiz</span>
            </div>
          </Col>
          <Col>
            {isLoggedIn && (
              <>
                <Space>
                  <Avatar shape="square" size="large" icon={<UserOutlined />} />
                  <Button onClick={userHandler}>User Profile</Button>
                  <Button type="primary" danger onClick={logoutHandler}>
                    Logout
                  </Button>
                </Space>
              </>
            )}
          </Col>
        </Row>

        <Divider plain style={{ marginTop: "0" }}></Divider>

        <Outlet />
      </Col>
    </Row>
  );
};

export default LayoutPage;
