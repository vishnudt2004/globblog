// Node module Imports
import { useParams } from "react-router-dom";

import {
  // Organisms
  EditorForm,
  UserVerification_enhancer,
} from "../../config/exports";

function UpdateBlog() {
  const { blogId } = useParams();

  const EditorForm_with_UserVerification = UserVerification_enhancer(
    EditorForm,
    {
      continueButton: { name: "Continue Edit Blog", icon: "file-pen" },
      redirectButton: {
        name: "Back to Blog Post",
        link: `/blog/${blogId}`,
        icon: "newspaper",
      },
    }
  );

  return <EditorForm_with_UserVerification type="update-blog" />;
}

export default UpdateBlog;
