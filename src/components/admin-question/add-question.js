import { Button, Form, Input, Modal } from "antd";

const AddForm = ({ onAddQuestion }) => {
  return (
    <Form layout="vertical" onFinish={onAddQuestion}>
      <Form.Item
        name="question"
        label="Question"
        rules={[
          {
            required: true,
            message: "Please input your Question!",
          },
        ]}
      >
        <Input placeholder="Question" />
      </Form.Item>
      <Form.Item
        name="answer1"
        label="Answer 1"
        rules={[
          {
            required: true,
            message: "Please input your Answer!",
          },
        ]}
      >
        <Input placeholder="Answer 1" />
      </Form.Item>
      <Form.Item
        name="answer2"
        label="Answer 2"
        rules={[
          {
            required: true,
            message: "Please input your Answer!",
          },
        ]}
      >
        <Input placeholder="Answer 2" />
      </Form.Item>
      <Form.Item
        name="answer3"
        label="Answer 3"
        rules={[
          {
            required: true,
            message: "Please input your Answer!",
          },
        ]}
      >
        <Input placeholder="Answer 3" />
      </Form.Item>
      <Form.Item
        name="answer4"
        label="Answer 4"
        rules={[
          {
            required: true,
            message: "Please input your Answer!",
          },
        ]}
      >
        <Input placeholder="Answer 4" />
      </Form.Item>
      <Form.Item
        name="correctanswer"
        label="Correct Answer"
        rules={[
          {
            required: true,
            message: "Please input your Correct Answer!",
          },
        ]}
      >
        <Input placeholder="Correct Answer" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddForm;
