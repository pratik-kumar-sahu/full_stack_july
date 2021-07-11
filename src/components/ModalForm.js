import React, { useState } from "react";
import "./styles.scss";
import Tag from "./Tag";

function ModalForm({ setModal }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    tags: [],
    color: "",
    status: "",
  });

  const onChangehandler = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitResponse = (e) => {
    e.preventDefault();
    console.log(formData);
    setModal(false);
  };

  return (
    <div className="modal">
      <form className="modal__container" onSubmit={submitResponse}>
        <input
          className="modal__container-input"
          type="text"
          placeholder="Give title..."
          name="title"
          value={formData.title}
          onChange={onChangehandler}
        />
        <input
          className="modal__container-input"
          type="text"
          placeholder="Give description..."
          name="description"
          value={formData.description}
          onChange={onChangehandler}
        />
        <input
          className="modal__container-input"
          type="date"
          placeholder="Give due date..."
          name="date"
          value={formData.date}
          onChange={onChangehandler}
        />
        <div className="modal__container-tags">
          {["Daily", "Work", "Important"].map((tag, i) => (
            <Tag
              key={i}
              id={i}
              tag={tag}
              formData={formData}
              setFormData={setFormData}
            />
          ))}
          {/* <button>Add Tag</button> */}
        </div>
        <input
          type="color"
          name="color"
          value={formData.color}
          onChange={onChangehandler}
        />
        <div className="modal__container-status">
          <select
            name="status"
            value={formData.status}
            onChange={onChangehandler}
          >
            <option value="" defaultValue>
              ---
            </option>
            <option value="backlog">Backlog</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ModalForm;
