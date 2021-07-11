import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.scss";
import Tag from "./Tag";

toast.configure();

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

  const validate = () => {
    const { title, description, date, tags, color, status } = formData;

    if (title.trim().length < 2) {
      toast.error("Title should be min. 2 characters", { autoClose: 3000 });
      return false;
    } else if (description.trim().length < 10) {
      toast.error("Description should be min. 10 characters", {
        autoClose: 3000,
      });
      return false;
    } else if (!date.trim()) {
      toast.error("Due Date is required", {
        autoClose: 3000,
      });
      return false;
    } else if (!status.trim()) {
      toast.error("Select status", {
        autoClose: 3000,
      });
      return false;
    } else if (tags.length === 0) {
      toast.error("Select atleast one tag", {
        autoClose: 3000,
      });
      return false;
    } else if (color.trim().length < 1) {
      toast.error("Select a color", {
        autoClose: 3000,
      });
      return false;
    }

    return true;
  };

  const submitResponse = (e) => {
    e.preventDefault();
    console.log(formData);

    if (validate()) {
      setModal(false);
      toast.success("Successful", { autoClose: 3000 });
    }
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

        <div className="modal__container-status">
          <select
            className="modal__container-input input2"
            name="status"
            value={formData.status}
            onChange={onChangehandler}
          >
            <option value="" defaultValue disabled>
              Status
            </option>
            <option value="backlog">Backlog</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div>
          <div className="modal__container-tags">
            <span style={{ marginRight: ".5rem" }}>📌</span>
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
            className="modal__container-color"
            type="color"
            name="color"
            value={formData.color ? formData.color : "#ff0000"}
            onChange={onChangehandler}
          />

          <button className="modal__container-submit" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModalForm;
