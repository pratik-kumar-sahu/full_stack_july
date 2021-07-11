import React, { useEffect, useState } from "react";

function Tag({ id, tag, formData, setFormData }) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
    console.log(selected);
  };

  useEffect(() => {
    if (selected) {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
    } else {
      console.log("else stmt");
      const index = formData.tags.indexOf(tag);
      if (index !== -1) {
        setFormData({
          ...formData,
          tags: formData.tags.filter((e) => e !== tag),
        });
      }
    }
  }, [selected, tag]);

  return (
    <div className={`tag ${selected && "selected"}`} onClick={handleClick}>
      {tag}
    </div>
  );
}

export default Tag;
