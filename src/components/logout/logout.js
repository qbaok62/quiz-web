import style from "./logout.module.css";
import { Button, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/auth.action";
import {
  selectAvatar,
  selectLoading,
  selectName,
  selectRefreshToken,
} from "../../redux/auth/auth.selector";

const Logout = () => {
  const refreshToken = useSelector(selectRefreshToken);
  const loading = useSelector(selectLoading);
  const avatar = useSelector(selectAvatar);
  const name = useSelector(selectName);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout(refreshToken));
  };

  return (
    <div className={style.header}>
      <div className={style.info}>
        <Avatar className={style.avatar} src={avatar} />
        <p className={style.name}>{name}</p>
      </div>
      <Button type="primary" danger onClick={logoutHandler} loading={loading}>
        Logout
      </Button>
    </div>
  );
};

export default Logout;
