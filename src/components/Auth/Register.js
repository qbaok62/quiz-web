import "antd/dist/antd.min.css";
import style from "./login.module.css";
import { MailOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/auth/auth.action";
import { Form, Input, Button, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { selectLoading } from "../../redux/auth/auth.selector";
import { Typography } from "antd";

const { Title } = Typography;

const Register = () => {
  const [form] = Form.useForm();
  const loading = useSelector(selectLoading);
  const userRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const submitHandler = (event) => {
    dispatch(register(event, form));
  };

  const changeHandler = () => {
    navigate("/login");
  };

  return (
    <Form
      form={form}
      name="normal_login"
      className={style.form}
      initialValues={{
        remember: true,
      }}
      onFinish={submitHandler}
    >
      <Row justify="center">
        <Title level={2}>Create a new account</Title>
      </Row>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your Email!",
          },
          { whitespace: true, message: "Email can not be empty." },
          { type: "email", message: "Please enter a valid Email!" },
        ]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Email"
          ref={userRef}
        />
      </Form.Item>
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
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
          { whitespace: true, message: "Username can not be empty." },
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
          SIGN UP
        </Button>
        Already have a account?{" "}
        <span className={style.change} onClick={changeHandler}>
          Login!
        </span>
      </Form.Item>
    </Form>
  );
};

export default Register;
