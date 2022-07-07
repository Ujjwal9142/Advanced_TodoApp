import {
  Button,
  Tag,
  Modal,
  Input,
  Typography,
  DatePicker,
  Select,
} from "antd";
import "antd/dist/antd.min.css";
import moment from "moment";
import React from "react";
const { Text } = Typography;

const EditTodo = ({
  isEditing,
  setIsEditing,
  editingTodo,
  setEditingTodo,
  addNewTag,
  setAddNewTag,
  statusOptions,
  handleDateChange,
  handleTagAddition,
  handleStatusChange,
  handleEditSaveClick,
}) => {
  return (
    <Modal
      title="Edit Todo"
      visible={isEditing}
      onCancel={() => {
        setIsEditing(false);
        setEditingTodo(null);
        setAddNewTag(null);
      }}
      onOk={handleEditSaveClick}
    >
      <div className="editing__container">
        <Text>Title:</Text>
        <Input
          value={editingTodo?.title}
          onChange={(e) => {
            setEditingTodo((previous) => {
              return { ...previous, title: e.target.value };
            });
          }}
          placeholder="Title"
          style={{ marginBottom: 12 }}
        />
      </div>

      <div className="editing__container">
        <Text>Description:</Text>
        <Input
          value={editingTodo?.description}
          onChange={(e) => {
            setEditingTodo((previous) => {
              return { ...previous, description: e.target.value };
            });
          }}
          placeholder="Description"
          style={{ marginBottom: 15 }}
        />
      </div>

      <div className="editing__container">
        <Text style={{ marginBottom: 12 }}>Due Date:</Text>
        <DatePicker
          style={{ marginLeft: 12, marginBottom: 12 }}
          onChange={handleDateChange}
          disabledDate={(current) => {
            return moment().add(-1, "days") >= current;
          }}
        />
      </div>

      <div className="editing__container">
        <Text style={{ marginBottom: 12 }}>Tags:</Text>
        <>
          {editingTodo?.tags?.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            return (
              <Tag color={color} key={tag} style={{ margin: 6 }}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
        <Input
          value={addNewTag ? addNewTag : ""}
          onChange={(e) => {
            setAddNewTag(e.target.value);
          }}
          placeholder="Add more Tags"
          style={{ marginBottom: 12, marginTop: 12 }}
        />
        <Button
          style={{ color: "green", marginBottom: 12 }}
          onClick={handleTagAddition}
        >
          Add Tag
        </Button>
      </div>

      <div className="editing__container">
        <Text style={{ marginBottom: 12, marginRight: 12 }}>Status:</Text>
        <Select
          placeholder="Set current Status of Todo"
          style={{ marginLeft: 12, marginBottom: 12, marginTop: 6 }}
          onChange={handleStatusChange}
          value={editingTodo?.status}
        >
          {statusOptions.map((option, index) => {
            return (
              <Select.Option key={index} value={option}>
                {option}
              </Select.Option>
            );
          })}
        </Select>
      </div>
    </Modal>
  );
};

export default EditTodo;
