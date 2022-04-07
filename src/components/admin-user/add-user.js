import { Button, Form, Input, Select } from "antd";
const { Option } = Select;

const AddForm = ({ onAddUser }) => {
  return (
    <Form layout="vertical" onFinish={onAddUser}>
      <Form.Item
        name="username"
        label="Username"
        rules={[
          {
            required: true,
            message: "Please input your User!",
          },
        ]}
      >
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input placeholder="Password" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            message: "Please input your Email!",
          },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="role"
        label="Role"
        rules={[
          {
            required: true,
            message: "Please input your Role!",
          },
        ]}
      >
        <Select placeholder="Select a role" allowClear>
          <Option value="user">user</Option>
          <Option value="admin">admin</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddForm;
