import { UserOutlined, LockOutlined } from "@ant-design/icons";
import style from "./Login.module.css";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/auth.middleware";
import "antd/dist/antd.min.css";
import { Form, Input, Button } from "antd";

const Login = (props) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const userRef = useRef();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    dispatch(login({ name, password }));
    if (!accessToken) {
      return;
    }
    setName("");
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
          { whitespace: true, message: "Password can not be empty." },
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
