"use client";

import { Button, Checkbox, DatePicker, Form, Input, Space } from "antd";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import ImageComponent from "./ImageComponent";
import RichTextEditor from "./RichTextEditor";

const defaultPicture = "/user.svg";

const CreateForm = () => {
  const [createForm] = Form.useForm();
  const router = useRouter();

  const userPictureRef = useRef(null);
  const [userPicture, setUserPicture] = useState(null);
  const [userInfo, setUserInfo] = useState({});

  const handleUserImage = () => {
    userPictureRef.current.click();
  };

  const handleUserImageChange = (event) => {
    const file = event.target.files[0];
    setUserPicture(file);
  };

  const onChange = (_, dateString) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      birthdate: dateString,
    }));
  };

  const handleSubmit = () => {
    createForm
      .validateFields()
      .then(async () => {
        const { name, phone } = createForm.getFieldsValue();

        if (userPicture) {
          const form = new FormData();

          form.append("name", name);
          form.append("profile_picture", userPicture);
          form.append("phone_number", phone);
          form.append("description", editorContent);
          form.append("birthdate", userInfo?.birthdate);
          form.append("active_status", userInfo?.active_status ?? false);

          console.log(name, userPicture, phone, editorContent, userInfo);

          try {
            const response = await fetch(
              "https://tasks.vitasoftsolutions.com/userdata/",
              {
                method: "POST",
                body: form,
                headers: {},
              }
            );

            if (response.ok) {
              console.log(response);
              router.push("/");
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          const userData = {
            name,
            phone_number: phone,
            description: editorContent,
            birthdate: userInfo?.birthdate,
            active_status: userInfo?.active_status ?? false,
          };

          try {
            const response = await fetch(
              "https://tasks.vitasoftsolutions.com/userdata/",
              {
                method: "POST",
                body: JSON.stringify(userData),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            if (response.ok) {
              console.log(response);
              router.push("/");
            }
          } catch (error) {
            console.log(error);
          }
        }
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  };

  const handleCheckboxChange = (e) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      active_status: e.target.checked,
    }));
  };

  const [editorContent, setEditorContent] = useState("");

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  return (
    <div className="p-5 rounded-md shadow-xl w-[50%] bg-white">
      <h1 className="mb-3 text-3xl font-bold text-center">Create A New User</h1>
      <figure className="mb-0 relative flex flex-col justify-center  items-center">
        <div className="relative w-36 h-36 mb-4">
          {userPicture ? (
            <ImageComponent
              imageUrl={URL.createObjectURL(userPicture)}
              className="w-full h-full rounded-full inline-block shadow-xl hover:shadow-2xl"
            />
          ) : (
            <ImageComponent
              imageUrl={defaultPicture}
              className="w-full h-full rounded-full inline-block shadow-xl hover:shadow-2xl"
            />
          )}

          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity ease-in-out duration-300">
            <div
              className="bg-black bg-opacity-50 rounded-full p-2 text-white flex items-center justify-center gap-2 hover:cursor-pointer hover:bg-opacity-70 text-sm"
              onClick={handleUserImage}
            >
              <input
                type="file"
                ref={userPictureRef}
                onChange={handleUserImageChange}
                style={{ display: "none" }}
              />
              <p className="text-white mb-0">Change Photo</p>
            </div>
          </div>
        </div>
      </figure>

      <Form
        name="create-user-form"
        form={createForm}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Name"
          name={"name"}
          rules={[
            {
              required: true,
              message: "Missing User Name",
            },
          ]}
        >
          <Input placeholder="User Name" />
        </Form.Item>
        <Form.Item label="Phone Number" name={"phone"}>
          <Input placeholder="Phone Number" type="number" />
        </Form.Item>
        <Form.Item
          label="Birth Date"
          name={"birthdate"}
          rules={[
            {
              required: true,
              message: "Missing User Birthdate",
            },
          ]}
        >
          <DatePicker
            onChange={onChange}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item label="Description" name={"description"}>
          <RichTextEditor value={editorContent} onChange={handleEditorChange} />
        </Form.Item>

        <Form.Item label="Status" name={"status"}>
          <Checkbox
            checked={userInfo.active_status}
            onChange={handleCheckboxChange}
          >
            Activity
          </Checkbox>
        </Form.Item>
      </Form>

      <Space className="w-full justify-end mb-5">
        <Button type="" size="middle" onClick={() => router.push("/")}>
          Cancel
        </Button>
        <Button type="primary" size="middle" onClick={handleSubmit}>
          Create
        </Button>
      </Space>
    </div>
  );
};

export default CreateForm;
