import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import the styles

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const RichTextEditor = ({ onChange, value }) => {
  const handleChange = (content, delta, source, editor) => {
    onChange(content);
  };

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={handleChange}
      modules={{
        toolbar: [
          [{ header: [1, 2, 3, 4, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["clean"],
        ],
      }}
    />
  );
};

export default RichTextEditor;
