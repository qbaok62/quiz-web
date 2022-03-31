import "antd/dist/antd.min.css";
import style from "./Login.module.css";
import { MailOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/auth.middleware";
import { Form, Input, Button } from "antd";

const Register = (props) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const userRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();

    dispatch(register({ name, password, email }));

    setName("");
    setEmail("");
    setPassword("");
  };

  const changeHandler = () => {
    props.onToggle();
  };

  return (
    <Form
      name="normal_login"
      className={style.form}
      initialValues={{
        remember: true,
      }}
    >
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={style.button}
          onClick={submitHandler}
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
