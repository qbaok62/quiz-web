import useApi from "../../custom-hook/useApi";
import axios from "../../api/axios";
import { Button, Input, message, Modal, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../redux/auth/auth.selector";
import { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AddForm from "./add-question";

let init = true;
const QuestionList = () => {
  const accessToken = useSelector(selectAccessToken);
  const { loading, data } = useApi("/v1/questions/edit?limit=26");
  const [isEditing, setIsEditing] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (init) {
      return (init = false);
    }
    setDataSource(data);
  }, [data]);

  console.log("dataSource:", dataSource);

  const columns = [
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
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
        return record.question.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Answer 1",
      dataIndex: "answer1",
      key: "answer1",
      width: "15%",
    },
    {
      title: "Answer 2",
      dataIndex: "answer2",
      key: "answer2",
      width: "15%",
    },
    {
      title: "Answer 3",
      dataIndex: "answer3",
      key: "answer3",
      width: "15%",
    },
    {
      title: "Answer 4",
      dataIndex: "answer4",
      key: "answer4",
      width: "15%",
    },
    {
      title: "Correct Answer",
      dataIndex: "correctanswer",
      key: "correctanswer",
      width: "15%",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <>
          <EditOutlined
            onClick={() => {
              onEditQuestion(record);
            }}
          />
          <DeleteOutlined
            onClick={() => {
              onDeleteQuestion(record);
            }}
            style={{ color: "red", marginLeft: 12 }}
          />
        </>
      ),
    },
  ];

  const onAddQuestion = (record) => {
    axios
      .post("/v1/questions/edit", record, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then(({ data }) => {
        setDataSource([...dataSource, data]);
        message.success("Add Successful");
      })
      .catch((error) => message.error(error.response.data.message));
  };

  const onDeleteQuestion = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this question?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((question) => question.id !== record.id);
        });
        axios.delete(`/v1/questions/edit/${record.id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      },
    });
  };

  const onEditQuestion = (record) => {
    setIsEditing(true);
    setEditingQuestion({ ...record });
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditingQuestion(null);
  };

  return (
    <>
      <Button onClick={() => setVisible(!visible)}>Add a new Question</Button>
      {visible && <AddForm onAddQuestion={onAddQuestion} />}
      <Table
        rowKey={(obj) => obj.id}
        columns={columns}
        dataSource={dataSource}
        pagination={{ position: ["top"] }}
        loading={loading}
      />
      <Modal
        title="Edit Questions"
        visible={isEditing}
        okText="Save"
        onCancel={() => {
          resetEditing();
        }}
        onOk={() => {
          setDataSource((pre) => {
            return pre.map((question) => {
              if (question.id === editingQuestion.id) {
                const newObj = { ...editingQuestion };
                delete newObj.id;
                axios.patch(`/v1/questions/edit/${question.id}`, newObj, {
                  headers: { Authorization: `Bearer ${accessToken}` },
                });
                return editingQuestion;
              } else {
                return question;
              }
            });
          });
          resetEditing();
        }}
      >
        <div>Question</div>
        <Input
          placeholder="Question"
          value={editingQuestion?.question}
          onChange={(e) => {
            setEditingQuestion((pre) => {
              return { ...pre, question: e.target.value };
            });
          }}
        />
        <div>Answer 1</div>
        <Input
          placeholder="Answer 1"
          value={editingQuestion?.answer1}
          onChange={(e) => {
            setEditingQuestion((pre) => {
              return { ...pre, answer1: e.target.value };
            });
          }}
        />
        <div>Answer 2</div>
        <Input
          value={editingQuestion?.answer2}
          onChange={(e) => {
            setEditingQuestion((pre) => {
              return { ...pre, answer2: e.target.value };
            });
          }}
        />
        <div>Answer 3</div>
        <Input
          value={editingQuestion?.answer3}
          onChange={(e) => {
            setEditingQuestion((pre) => {
              return { ...pre, answer3: e.target.value };
            });
          }}
        />
        <div>Answer 4</div>
        <Input
          value={editingQuestion?.answer4}
          onChange={(e) => {
            setEditingQuestion((pre) => {
              return { ...pre, answer4: e.target.value };
            });
          }}
        />
        <div>Correct Answer</div>
        <Input
          value={editingQuestion?.correctanswer}
          onChange={(e) => {
            setEditingQuestion((pre) => {
              return { ...pre, correctanswer: e.target.value };
            });
          }}
        />
      </Modal>
    </>
  );
};

export default QuestionList;
