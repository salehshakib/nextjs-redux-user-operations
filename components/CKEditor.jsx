"use client";

import dynamic from "next/dynamic";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const DynamicCKEditor = dynamic(() => import("@ckeditor/ckeditor5-react"), {
  ssr: false,
  loading: () => <p>Loading CKEditor...</p>,
});

const CKEditorWrapper = ({ onChange, initialValue }) => {
  return (
    <DynamicCKEditor
      editor={ClassicEditor}
      onChange={onChange}
      data={initialValue}
    />
  );
};

export default CKEditorWrapper;
