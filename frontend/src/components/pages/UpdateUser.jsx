// Node module Imports
import { useParams } from "react-router-dom";

import UpdateUserForm from "@/components/organisms/UpdateUserForm";
import { UserVerification_enhancer } from "@/components/organisms/UserVerification";

function UpdateUser() {
  const { userId } = useParams();

  const UpdateUserForm_with_UserVerification = UserVerification_enhancer(
    UpdateUserForm,
    {
      continueButton: { name: "Continue Edit Profile", icon: "user-pen" },
      redirectButton: {
        name: "Back to Profile Page",
        link: `/user/${userId}`,
        icon: "user-tie",
      },
    },
  );

  return <UpdateUserForm_with_UserVerification />;
}

export default UpdateUser;
