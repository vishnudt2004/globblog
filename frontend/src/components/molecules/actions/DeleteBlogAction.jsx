// Node module Imports
import { useEffect, useState } from "react";

import {
  // Organisms
  UserVerification,

  // Contexts
  usePreLoader,

  // APIs
  blogApis,
} from "../../../config/exports";

function DeleteBlogAction_enhancer(Component, blogId, setResult) {
  const Component_enhanced = (props) => {
    const showPreLoader = usePreLoader();

    const [verified, setVerified] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const fetchDeletionResult = async () => {
        showPreLoader(true);

        const apiData = await blogApis.deleteBlog({ blogId });

        setResult(apiData);

        showPreLoader(false);
      };

      if (verified) {
        fetchDeletionResult();
      }
    }, [showPreLoader, verified]);

    const handleClick = () => setVisible(true);

    return (
      <>
        <Component onClick={handleClick} {...props} />

        <UserVerification
          visible={visible}
          setVisible={setVisible}
          setVerified={setVerified}
        />
      </>
    );
  };

  return Component_enhanced;
}

export default DeleteBlogAction_enhancer;
