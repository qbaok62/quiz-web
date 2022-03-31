import { useState } from "react";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";

const AuthPage = () => {
  const [toggle, setToggle] = useState("true");

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  return (
    <div>
      {toggle && <Login onToggle={toggleHandler} />}
      {!toggle && <Register onToggle={toggleHandler} />}
    </div>
  );
};

export default AuthPage;
