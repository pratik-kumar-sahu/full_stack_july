import React, { useEffect, useState } from "react";

function Tag({ tag, formData, setFormData }) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
  };

  useEffect(() => {
    if (tag === formData.tags.find((e) => e === tag)) {
      setSelected(true);
    }
  }, [tag, formData]);

  useEffect(() => {
    if (selected) {
      if (!formData.tags.includes(tag))
        setFormData({ ...formData, tags: [...formData.tags, tag] });
    } else {
      const index = formData.tags.indexOf(tag);
      if (index !== -1) {
        setFormData({
          ...formData,
          tags: formData.tags.filter((e) => e !== tag),
        });
      }
    }
  }, [selected, tag, formData, setFormData]);

  return (
    <div className={`tag ${selected && "selected"}`} onClick={handleClick}>
      {tag}
    </div>
  );
}

export default Tag;
