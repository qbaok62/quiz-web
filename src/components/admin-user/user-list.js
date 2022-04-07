import axios from "../../api/axios";
import useApi from "../../custom-hook/useApi";
import AddForm from "./add-user";
import { Avatar, Button, Input, message, Modal, Table, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { selectAccessToken } from "../../redux/auth/auth.selector";
import { useSelector } from "react-redux";

let init = true;
const UserList = () => {
  const { loading, data } = useApi("/v1/users?limit=200");
  const [visible, setVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const accessToken = useSelector(selectAccessToken);

  useEffect(() => {
    if (init) {
      return (init = false);
    }
    setDataSource(data);
  }, [data]);

  const columns = [
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
      width: "20%",
      render: (text) => <a>{text}</a>,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.username.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      width: "10%",
      render: (avatar) => <Avatar src={avatar} />,
    },
    ,
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "25%",
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
      width: "10%",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "10%",
      render: (role) => (
        <Tag color={role === "admin" && "volcano"} key={role}>
          {role}
        </Tag>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (record) => (
        <EditOutlined
          onClick={() => {
            onEditUser(record);
          }}
        />
      ),
    },
  ];

  const onAddUser = async (record) => {
    axios
      .post("/v1/users", record, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then(({ data }) => {
        setDataSource([...dataSource, data]);
        message.success("Add Successful");
      })
      .catch((error) => message.error(error.response.data.message));
  };

  const onEditUser = (record) => {
    setIsEditing(true);
    setEditingUser({ ...record });
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditingUser(null);
  };

  return (
    <>
      <Button onClick={() => setVisible(!visible)}>Add a new User</Button>
      {visible && <AddForm onAddUser={onAddUser} />}
      <Table
        rowKey={(obj) => obj.id}
        columns={columns}
        dataSource={dataSource}
        pagination={{ position: ["top"] }}
        loading={loading}
      />

      <Modal
        title="Edit User"
        visible={isEditing}
        okText="Save"
        onCancel={() => {
          resetEditing();
        }}
        onOk={() => {
          setDataSource((pre) => {
            return pre.map((user) => {
              if (user.id === editingUser.id) {
                const newObj = { ...editingUser };
                delete newObj.id;
                delete newObj.score;
                delete newObj.isEmailVerified;
                axios.patch(`/v1/users/${user.id}`, newObj, {
                  headers: { Authorization: `Bearer ${accessToken}` },
                });
                return editingUser;
              } else {
                return user;
              }
            });
          });
          resetEditing();
        }}
      >
        <Input
          placeholder="Username"
          value={editingUser?.username}
          onChange={(e) => {
            setEditingUser((pre) => {
              return { ...pre, username: e.target.value };
            });
          }}
        />
        <Input
          placeholder="Avatar"
          value={editingUser?.avatar}
          onChange={(e) => {
            setEditingUser((pre) => {
              return { ...pre, avatar: e.target.value };
            });
          }}
        />
        <Input
          placeholder="Email"
          value={editingUser?.email}
          onChange={(e) => {
            setEditingUser((pre) => {
              return { ...pre, email: e.target.value };
            });
          }}
        />
        <Input
          placeholder="Role"
          value={editingUser?.role}
          onChange={(e) => {
            setEditingUser((pre) => {
              return { ...pre, role: e.target.value };
            });
          }}
        />
      </Modal>
    </>
  );
};

export default UserList;
