import axios from "../../api/axios";
import { Form, Input, Modal } from "antd";

const UpdateForm = ({
  isEditing,
  resetEditing,
  editingQuestion,
  setEditingQuestion,
  setDataSource,
}) => {
  console.log("editingQuestion", editingQuestion);
  return (
    <Modal
      title="Edit Questions"
      visible={isEditing}
      okText="Save"
      onCancel={() => {
        resetEditing();
      }}
      onOk={(e) => {
        setDataSource((pre) => {
          return pre.results.map((question) => {
            if (question.id === editingQuestion.id) {
              // axios.patch(
              //   `/v1/questions/edit/${question.id}`,
              //   editingQuestion,
              //   {
              //     headers: { Authorization: `Bearer ${accessToken}` },
              //   }
              // );
              return editingQuestion;
            } else {
              return question;
            }
          });
        });
        resetEditing();
      }}
    >
      <Form>
        <Input
          placeholder="Question"
          value={editingQuestion?.question}
          onChange={(e) => {
            setEditingQuestion((pre) => {
              return { ...pre, question: e.target.value };
            });
          }}
        />
        <Input
          placeholder="Answer 1"
          value={editingQuestion?.answer1}
          onChange={(e) => {
            setEditingQuestion((pre) => {
              return { ...pre, answer1: e.target.value };
            });
          }}
        />
      </Form>
      <Input
        value={editingQuestion?.answer2}
        onChange={(e) => {
          setEditingQuestion((pre) => {
            return { ...pre, answer2: e.target.value };
          });
        }}
      />
      <Input
        value={editingQuestion?.answer3}
        onChange={(e) => {
          setEditingQuestion((pre) => {
            return { ...pre, answer3: e.target.value };
          });
        }}
      />
      <Input
        value={editingQuestion?.answer4}
        onChange={(e) => {
          setEditingQuestion((pre) => {
            return { ...pre, answer4: e.target.value };
          });
        }}
      />
      <Input
        value={editingQuestion?.correctanswer}
        onChange={(e) => {
          setEditingQuestion((pre) => {
            return { ...pre, correctanswer: e.target.value };
          });
        }}
      />
    </Modal>
  );
};

export default UpdateForm;
