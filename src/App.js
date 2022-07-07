import { ConfigProvider, Input } from "antd";
import enUS from "antd/lib/locale/en_US";
import ProTable from "@ant-design/pro-table";
import { Button, Typography, Tag, Modal } from "antd";
import "antd/dist/antd.min.css";
import { useEffect, useState } from "react";
import "./App.css";
import AddTodo from "./components/AddTodo";
import EditTodo from "./components/EditTodo";
import moment from "moment";
const { Title } = Typography;

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [addingTodo, setAddingTodo] = useState({});
  const [addNewTag, setAddNewTag] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const createdDate = moment().format("MM ddd, YYYY HH:mm:ss");
  const tempDate = moment().add(7, "day");
  const dueDate = tempDate.format("dddd Do MMMM, YYYY");
  const statusOptions = ["Open", "Working", "Done", "Overdue"];
  const initialState = [
    {
      id: 1,
      created_at: createdDate,
      title: "Read a book",
      description: "Read the book 'Rich Dad Poor Dad'",
      due_date: dueDate,
      tags: ["Read", "Knowledge"],
      status: "Open",
    },
    {
      id: 2,
      created_at: createdDate,
      title: "Order a Laptop",
      description: "Order 'Macbook Air' from Amazon",
      due_date: dueDate,
      tags: ["Purchase", "Order"],
      status: "Open",
    },
    {
      id: 3,
      created_at: createdDate,
      title: "Mom's Birthday",
      description: "Purchase a gift for 'Mom's birthday'",
      due_date: dueDate,
      tags: ["Gift", "Purchase"],
      status: "Open",
    },
    {
      id: 4,
      created_at: createdDate,
      title: "Watch anime series",
      description: "Watch 'Attack on Titan' final Season",
      due_date: dueDate,
      tags: ["Stream", "Online"],
      status: "Open",
    },
  ];
  const [dataSource, setDataSource] = useState(initialState);
  const [queryDataSource, setQueryDataSource] = useState();
  const columns = [
    {
      key: "id",
      title: "Todo ID",
      dataIndex: "id",
    },
    {
      key: "created_at",
      title: "Created at",
      dataIndex: "created_at",
    },
    {
      key: "title",
      title: "Title",
      dataIndex: "title",
      sorter: (record1, record2) => {
        return record1.title.localeCompare(record2.title);
      },
    },
    {
      key: "description",
      title: "Description",
      dataIndex: "description",
      sorter: (record1, record2) => {
        return record1.description.localeCompare(record2.description);
      },
    },
    {
      key: "due_date",
      title: "Due Date",
      dataIndex: "due_date",
    },
    {
      key: "tags",
      title: "Tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags?.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            return (
              <Tag color={color} key={tag} style={{ margin: 6 }}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
      filters: [
        { text: "Open", value: "Open" },
        { text: "Working", value: "Working" },
        { text: "Done", value: "Done" },
        { text: "Overdue", value: "Overdue" },
      ],
      onFilter: (value, record) => {
        return record.status === value;
      },
    },
    {
      key: "actions",
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            style={{ margin: 6, borderRadius: 12 }}
            onClick={() => {
              handleEditClick(record);
            }}
          >
            Edit
          </Button>
          <Button
            type="danger"
            style={{ margin: 6, borderRadius: 12 }}
            onClick={() => {
              handleDeleteClick(record);
            }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  // Logic to handle Modal Opening and deletion of a ToDo.

  const handleDeleteClick = (record) => {
    Modal.confirm({
      title: "Are you sure you want to remove this ToDo from the ToDo List?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        setDataSource(
          dataSource.filter((data) => {
            return data.id !== record.id;
          })
        );
      },
    });
  };

  // Logic to handle "Edit Todo" Modal opening and setting editTodo state.

  const handleEditClick = (record) => {
    setIsEditing(true);
    setEditingTodo({ ...record });
  };

  // Logic to handle due date change of ToDo in both editing and adding modes.

  const handleDateChange = (date) => {
    const newDueDate = date.format("dddd Do MMMM, YYYY");
    if (isEditing) {
      setEditingTodo((previous) => {
        return { ...previous, due_date: newDueDate };
      });
    } else {
      if (isAdding) {
        setAddingTodo((previous) => {
          return { ...previous, due_date: newDueDate };
        });
      }
    }
  };

  // Logic to handle status change of ToDo in both editing and adding modes.

  const handleStatusChange = (value) => {
    if (isEditing) {
      setEditingTodo((previous) => {
        return { ...previous, status: value };
      });
    } else {
      if (isAdding) {
        setAddingTodo((previous) => {
          return { ...previous, status: value };
        });
      }
    }
  };

  // Logic to handle addition of "edited" ToDo to dataSource state and clearing some other states.

  const handleEditSaveClick = () => {
    if (!editingTodo.title) {
      alert("Title field is Manadatory!");
      return;
    }
    if (!editingTodo.description) {
      alert("Description field is Manadatory!");
      return;
    }
    if (!editingTodo.status) {
      alert("Status field is Manadatory!");
      return;
    }
    setDataSource(
      dataSource.map((todo) => {
        if (todo.id === editingTodo.id) {
          return editingTodo;
        } else {
          return todo;
        }
      })
    );
    setIsEditing(false);
    setEditingTodo(null);
    setAddNewTag(null);
  };

  // Logic to handle addition of ToDo to dataSource state and clearing some other states.

  const handleAddSaveClick = () => {
    if (!addingTodo.title) {
      alert("Title field is Manadatory!");
      return;
    }
    if (!addingTodo.description) {
      alert("Description field is Manadatory!");
      return;
    }
    if (!addingTodo.status) {
      alert("Status field is Manadatory!");
      return;
    }
    setDataSource([...dataSource, addingTodo]);
    setIsAdding(false);
    setAddingTodo({});
    setAddNewTag(null);
  };

  // Logic to handle addition of Tags for a ToDo in both editing and adding modes.

  const handleTagAddition = () => {
    if (isEditing) {
      const doesTagExist = editingTodo?.tags?.find((tag) => {
        return (
          tag.toString().toUpperCase() === addNewTag.toString().toUpperCase()
        );
      });
      if (!doesTagExist) {
        setEditingTodo((previous) => {
          return {
            ...previous,
            tags: previous.tags ? [...previous.tags, addNewTag] : [addNewTag],
          };
        });
      }
      setAddNewTag(null);
    } else {
      if (isAdding) {
        const doesTagExist = addingTodo?.tags?.find((tag) => {
          return (
            tag.toString().toUpperCase() === addNewTag.toString().toUpperCase()
          );
        });
        if (!doesTagExist) {
          setAddingTodo((previous) => {
            return {
              ...previous,
              tags: previous.tags ? [...previous.tags, addNewTag] : [addNewTag],
            };
          });
        }
        setAddNewTag(null);
      }
    }
  };

  // Logic to handle "Add Todo" Modal opening and setting id & created_at properties for a ToDo.

  const handleAddTodoClick = () => {
    const newId = Math.floor(Math.random() * 10000);
    setAddingTodo((previous) => {
      return {
        ...previous,
        id: newId,
        created_at: moment().format("MM ddd, YYYY HH:mm:ss a"),
      };
    });
    setIsAdding(true);
  };

  // Logic to update queryDataSource for performing case insensitive search.

  useEffect(() => {
    const filteredData = dataSource.filter((data) =>
      data.title
        .toString()
        .toLowerCase()
        .includes(searchValue.toString().toLowerCase())
    );
    setQueryDataSource(filteredData);
  }, [searchValue]);

  return (
    <div className="App">
      <Title
        style={{
          marginTop: 12,
          marginBottom: 24,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Advanced ToDo WebApp
      </Title>
      <Input
        placeholder="Search by ToDo's Title"
        style={{
          marginTop: 12,
          marginBottom: 24,
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: 12,
          width: "40%",
        }}
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
      <ConfigProvider locale={enUS}>
        <ProTable
          search={false}
          columns={columns}
          dataSource={searchValue.length > 0 ? queryDataSource : dataSource}
          pagination={{
            pageSize: 5,
          }}
          style={{ marginLeft: 12, marginRight: 12 }}
        />
      </ConfigProvider>
      <EditTodo
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        editingTodo={editingTodo}
        setEditingTodo={setEditingTodo}
        addNewTag={addNewTag}
        setAddNewTag={setAddNewTag}
        statusOptions={statusOptions}
        handleDateChange={handleDateChange}
        handleTagAddition={handleTagAddition}
        handleStatusChange={handleStatusChange}
        handleEditSaveClick={handleEditSaveClick}
      />
      <AddTodo
        isAdding={isAdding}
        setIsAdding={setIsAdding}
        addingTodo={addingTodo}
        setAddingTodo={setAddingTodo}
        addNewTag={addNewTag}
        setAddNewTag={setAddNewTag}
        statusOptions={statusOptions}
        handleDateChange={handleDateChange}
        handleTagAddition={handleTagAddition}
        handleStatusChange={handleStatusChange}
        handleAddSaveClick={handleAddSaveClick}
      />
      <Button
        style={{
          marginTop: 12,
          marginBottom: 12,
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: 12,
        }}
        onClick={handleAddTodoClick}
        type="primary"
      >
        Add Todo
      </Button>
    </div>
  );
}

export default App;
