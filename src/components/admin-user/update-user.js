import axios from "../../api/axios";
import { Form, Input, Modal, Select } from "antd";
const { Option } = Select;
const UpdateForm = ({
  isEditing,
  resetEditing,
  editingUser,
  setEditingUser,
  setDataSource,
  accessToken,
}) => {
  console.log("editingUser", editingUser?.id);
  return (
    <Modal
      title="Edit User"
      visible={isEditing}
      okText="Save"
      onCancel={() => {
        resetEditing();
      }}
      onOk={(e) => {
        setDataSource((pre) => {
          return pre.map((user) => {
            if (user.id === editingUser.id) {
              const newObj = { ...editingUser };
              delete newObj.id;
              axios
                .patch(`/v1/users/edit/${user.id}`, newObj, {
                  headers: { Authorization: `Bearer ${accessToken}` },
                })
                .then(() => {
                  return editingUser;
                });
            } else {
              return user;
            }
          });
        });
        resetEditing();
      }}
    >
      <Form>
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
        <Form.item>
          <Select placeholder="Select a role" allowClear>
            <Option value="user">user</Option>
            <Option value="admin">admin</Option>
          </Select>
        </Form.item>
        {/* <Input
        placeholder="Role"
        value={editingUser?.role}
        onChange={(e) => {
          setEditingUser((pre) => {
            return { ...pre, role: e.target.value };
          });
        }}
      /> */}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
