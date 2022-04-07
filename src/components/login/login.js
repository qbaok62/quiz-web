import "antd/dist/antd.min.css";
import style from "./login.module.css";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/auth.action";
import { Form, Input, Button, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { selectLoading } from "../../redux/auth/auth.selector";
import { Typography } from "antd";

const { Title } = Typography;

const Login = () => {
  const loading = useSelector(selectLoading);
  const userRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const submitHandler = (event) => {
    console.log(event);
    dispatch(login(event));
  };

  const changeHandler = () => {
    navigate("/register");
  };

  return (
    <Form
      name="normal_login"
      className={style.form}
      initialValues={{
        remember: true,
      }}
      onFinish={submitHandler}
    >
      <Row justify="center">
        <Title level={2}>Please Log In</Title>
      </Row>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
          { whitespace: true, message: "Username can not be empty." },
          { min: 8, message: "Username must be minimum 5 characters." },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          ref={userRef}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
          { whitespace: true, message: "Password can not be empty." },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={style.button}
          loading={loading}
        >
          LOG IN
        </Button>
        Or{" "}
        <span className={style.change} onClick={changeHandler}>
          register now!
        </span>
      </Form.Item>
    </Form>
  );
};

export default Login;
