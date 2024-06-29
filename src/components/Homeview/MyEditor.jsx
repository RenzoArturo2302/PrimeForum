import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const MyEditor = ({ value, handleContent }) => {
  const editorRef = useRef(null);

  const handleEditorChange = (content) => {
    handleContent(content);
  };

  return (
    <Editor
      apiKey="6vqp473ek00d81ls763t94rjboowd1ltr9xyv7pwbx2aaqon"
      value={value}
      onEditorChange={handleEditorChange}
      init={{
        menubar: false,
        plugins:
          "anchor autolink charmap codesample image link lists media searchreplace visualblocks checklist mediaembed casechange export formatpainter pageembed linkchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tableofcontents autocorrect inlinecss markdown",
        toolbar:
          " | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
        image_advtab: true,
        tinycomments_mode: "embedded",
        tinycomments_author: "Author name",
        mergetags_list: [
          { value: "First.Name", title: "First Name" },
          { value: "Email", title: "Email" },
        ],
      }}
    />
  );
};

export default MyEditor;
