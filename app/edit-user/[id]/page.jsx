import EditForm from "@components/EditForm";
import React from "react";

const EditUser = ({ params }) => {
  return <EditForm id={params.id} />;
};

export default EditUser;
