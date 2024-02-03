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
import { useRef, useState } from "react";
dayjs.extend(customParseFormat);

const defaultPicture = "/user.svg";

const EditForm = ({ id }) => {
  const [createForm] = Form.useForm();
  const router = useRouter();

  const userPictureRef = useRef(null);
  const [pictureLoading, setPictureLoading] = useState(false);
  const [userPicture, setUserPicture] = useState();
  const [userInfo, setUserInfo] = useState({});

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

    const form = new FormData();
    form.append();
    // form.append("images", file);
    // form.append("user_id", id);
    // setPictureLoading(true);
    // const { data } = await axios({
    //   method: 'post',
    //   url: `${API_URL}${UPDATE_USER_PICTURE}`,
    //   data: form,
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     Authorization: `Bearer ${localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null}`,
    //   },
    // });

    // if (data.status) {
    //   setPictureLoading(false);
    //   // setError(null);
    //   // setStatus(false);
    //   // setUserPicture(data.data.path);
    //   // message.success(data.message);
    // } else {
    //   // message.error(data.message);
    //   setPictureLoading(false);
    //   // setError(data.error);
    // }
  };

  // const [activity, setActivity] = useState(false);
  const [birthdate, setBirthdate] = useState();

  const onChange = (date, dateString) => {
    setBirthdate(dateString);
  };

  const handleSubmit = () => {
    createForm
      .validateFields()
      .then(() => {
        const { name, phone, status } = createForm.getFieldsValue();

        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          name,
          phone,
          status,
          joining_date: dayjs().format("YYYY-MM-DD"),
          birthdate,
        }));

        console.log();
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
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
        <Form.Item
          label="Phone Number"
          name={"number"}
          rules={[
            {
              required: true,
              message: "Missing User Phone Number",
            },
          ]}
        >
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
          <CKEditor
            editor={ClassicEditor}
            // data="<p>Hello from CKEditor&nbsp;5!</p>"

            onChange={(event, editor) => {
              const data = editor.getData();
            }}
          />
        </Form.Item>
        <Form.Item label="Status" name={"status"} initialValue={false}>
          <Checkbox>Activity</Checkbox>
        </Form.Item>
      </Form>

      <Space className="w-full justify-end mb-5">
        <Button
          type=""
          size="middle"
          // onClick={() => setIsProfileModalOpen(false)}
          onClick={() => router.push("/")}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          size="middle"
          // htmlType="submit"
          onClick={handleSubmit}
        >
          Create
        </Button>
      </Space>
    </div>
  );
};

export default EditForm;
