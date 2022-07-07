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
import React, { useState } from "react";
const { Text } = Typography;

const AddTodo = ({
  isAdding,
  setIsAdding,
  addingTodo,
  setAddingTodo,
  addNewTag,
  setAddNewTag,
  statusOptions,
  handleDateChange,
  handleTagAddition,
  handleStatusChange,
  handleAddSaveClick,
}) => {
  const [titleField, setTitleField] = useState("");
  const [descriptionField, setDescriptionField] = useState("");
  const [defaultDate, setDefaultDate] = useState(moment());
  const dateFormat = "YYYY-MM-DD";

  return (
    <Modal
      title="Add Todo"
      visible={isAdding}
      onCancel={() => {
        setIsAdding(false);
        setAddingTodo({});
        setAddNewTag(null);
        setTitleField("");
        setDescriptionField("");
        setDefaultDate(null);
      }}
      onOk={() => {
        setTitleField("");
        setDescriptionField("");
        setDefaultDate(null);
        handleAddSaveClick();
      }}
    >
      <div className="adding__container">
        <Text>Title:</Text>
        <Input
          value={titleField}
          onChange={(e) => {
            setTitleField(e.target.value);
            setAddingTodo((previous) => {
              return { ...previous, title: e.target.value };
            });
          }}
          placeholder="Title"
          style={{ marginBottom: 12 }}
        />
      </div>

      <div className="adding__container">
        <Text>Description:</Text>
        <Input
          value={descriptionField}
          onChange={(e) => {
            setDescriptionField(e.target.value);
            setAddingTodo((previous) => {
              return { ...previous, description: e.target.value };
            });
          }}
          placeholder="Description"
          style={{ marginBottom: 15 }}
        />
      </div>

      <div className="adding__container">
        <Text style={{ marginBottom: 12 }}>Due Date:</Text>
        <DatePicker
          defaultValue={defaultDate}
          format={dateFormat}
          style={{ marginLeft: 12, marginBottom: 12 }}
          onChange={handleDateChange}
          disabledDate={(current) => {
            return moment().add(-1, "days") >= current;
          }}
        />
      </div>

      <div className="adding__container">
        <Text style={{ marginBottom: 12 }}>Tags:</Text>
        <>
          {addingTodo?.tags?.map((tag) => {
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

      <div className="adding__container">
        <Text style={{ marginBottom: 12, marginRight: 12 }}>Status:</Text>
        <Select
          placeholder="Set current Status of Todo"
          style={{ marginLeft: 12, marginBottom: 12, marginTop: 6 }}
          onChange={handleStatusChange}
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

export default AddTodo;
