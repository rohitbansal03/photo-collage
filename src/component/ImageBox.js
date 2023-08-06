import ReactQuill from "react-quill";
import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";

function ImageBox({ imageName, index }) {
  const [item, setItem] = useState(() => {
    const item = localStorage.getItem(`collage-${imageName}`);
    if (item) {
      return JSON.parse(item);
    } else {
      return getItem("This is a <b>sample</b> text");
    }
  });

  function getItem(content) {
    return {
      name: imageName,
      content: content,
    };
  }

  function handleOnContentChange(_content, _delta, _source, editor) {
    setItem({
      ...item,
      content: editor.getHTML(),
    });
  }

  function handleOnImgLoad({ target: img }) {
    setItem({
      ...item,
      width: img.offsetWidth,
      height: img.offsetHeight,
    });
  }

  useEffect(() => {
    localStorage.setItem(`collage-${imageName}`, JSON.stringify(item));
  }, [item, imageName]);

  return (
    <div>
      <div className="image" id={imageName}>
        <img onLoad={handleOnImgLoad} src={imageName} title={imageName} alt={`alt-${index}`} />
      </div>
      <div className="content">
        <ReactQuill
          theme={quillEditorConfig.theme}
          modules={quillEditorConfig.modules}
          value={item.content}
          onChange={handleOnContentChange}
        />
      </div>
    </div>
  );
}

const quillEditorConfig = {
  theme: "snow",
  modules: {
    toolbar: false,
  },
};

export default ImageBox;
