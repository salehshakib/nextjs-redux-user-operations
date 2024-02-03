"use client";

import { useRouter } from "next/navigation";
import {
  Button,
  Form,
  Input,
  Upload,
  DatePicker,
  Checkbox,
  Space,
  Spin,
} from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Image from "next/image";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useEffect, useRef, useState } from "react";
dayjs.extend(customParseFormat);

const defaultPicture = "/user.svg";

const EditForm = ({ id }) => {
  const [editForm] = Form.useForm();
  const router = useRouter();

  const userPictureRef = useRef(null);
  const [pictureLoading, setPictureLoading] = useState(false);
  const [userPicture, setUserPicture] = useState();
  const [userInfo, setUserInfo] = useState({});
  const [customDescription, setCustomDescription] = useState("");
  const [activeStatus, setActiveStatus] = useState(false);

  const [fields, setfields] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `https://tasks.vitasoftsolutions.com/userdata/${id}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const result = await response.json();
          setUserInfo(result);
          setfields([
            {
              name: ["name"],
              value: result?.name,
            },
            {
              name: ["phone"],
              value: result?.phone_number,
            },
            {
              name: ["birthdate"],
              value: dayjs(result?.birthdate),
            },
          ]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserDetails();
  }, [id]);

  console.log(userInfo);

  const ImageComponent = ({ imageUrl }) => {
    if (pictureLoading) {
      return <Spin className="absolute top-1/2 left-1/2" />;
    } else {
      return (
        <div className="cursor-pointer w-full h-full">
          <Image
            src={imageUrl}
            alt="no_image"
            width={144}
            height={144}
            className="rounded-full inline-block shadow-xl hover:shadow-2xl object-cover "
          />
        </div>
      );
    }
  };

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
    editForm
      .validateFields()
      .then(async () => {
        const { name, phone } = editForm.getFieldsValue();

        if (userPicture) {
          const form = new FormData();

          console.log(phone, customDescription, activeStatus, userPicture);
          form.append("name", name);
          form.append("profile_picture", userPicture);
          form.append("phone_number", phone);
          form.append("description", customDescription);
          form.append("birthdate", userInfo?.birthdate);
          form.append("active_status", userInfo?.active_status);

          try {
            const response = await fetch(
              "https://tasks.vitasoftsolutions.com/userdata/",
              {
                method: "POST",
                body: form,
                headers: {
                  // "Content-Type": "multipart/form-data",
                },
              }
            );

            if (response.ok) {
              router.push("/");
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          const userData = {
            name,
            phone_number: phone,
            description: customDescription,
            birthdate: userInfo?.birthdate,
            active_status: userInfo?.active_status,
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
              router.push("/");
              // revalidateTag("userList");
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

  return (
    <div className="p-5 rounded-md shadow-xl w-[50%] bg-white">
      <h1 className="mb-3 text-3xl font-bold text-center">Edit User</h1>
      <figure className="mb-0 relative flex flex-col justify-center items-center">
        <div className="relative w-36 h-36 mb-4">
          {pictureLoading ? (
            <Spin className="absolute top-1/2 left-1/2" />
          ) : userPicture ? (
            <ImageComponent
              imageUrl={URL.createObjectURL(userPicture)}
              className="w-full h-full rounded-full inline-block shadow-xl hover:shadow-2xl"
            />
          ) : userInfo?.profile_picture ? (
            <ImageComponent
              imageUrl={userInfo?.profile_picture}
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
        form={editForm}
        autoComplete="off"
        layout="vertical"
        fields={fields}
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
              message: "Missing User Birth Date",
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
          <CKEditor
            editor={ClassicEditor}
            data={userInfo?.description}
            onChange={(event, editor) => {
              setCustomDescription(editor.getData());
            }}
          />
        </Form.Item>
        <Form.Item label="Status" name="status">
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

export default EditForm;
