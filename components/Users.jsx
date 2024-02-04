"use client";

import { setUsers } from "@redux/features/user/userSlice";
import Image from "next/image";
import { Table, Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import { useRouter } from "next/navigation";

const Users = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { users, success } = useSelector((state) => state.users);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://tasks.vitasoftsolutions.com/userdata/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            next: {
              tags: ["userList"],
            },
          }
        );

        if (response.ok) {
          const result = await response.json();

          dispatch(setUsers(result));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, [dispatch]);

  const columns = [
    {
      title: "",
      dataIndex: "image",
      key: "image",
      fixed: "left",
      width: 50,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: 200,
      className: "py-0",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
    {
      title: "Joining Date",
      dataIndex: "joinDate",
      key: "joinDate",
      align: "center",
    },
    {
      title: "Birth Date",
      dataIndex: "birthDate",
      key: "birthDate",
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      align: "center",
    },
  ];

  const usersList = [];

  users?.map((item) => {
    const {
      id,
      name,
      profile_picture,
      phone_number,
      description,
      birthdate,
      joining_date,
      active_status,
    } = item;

    return usersList.push({
      key: id,
      image: (
        <div className="w-8 h-8 rounded-full overflow-hidden">
          {profile_picture && (
            <Image
              src={profile_picture}
              width={30}
              height={30}
              alt="user-image"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      ),
      name: <div className="flex flex-col">{parse(name)}</div>,
      phone: phone_number,
      joinDate: joining_date,
      birthDate: birthdate,
      description: description && parse(description),
      status: <>{active_status ? "True" : "False"}</>,
      action: (
        <Button onClick={() => router.push(`/edit-user/${id}`)}>edit</Button>
      ),
    });
  });

  return (
    <div className="text-center py-10 border px-5 w-screen sm:w-auto ">
      <h1 className="mb-8 text-3xl font-bold">User Table</h1>
      <Table
        size="small"
        columns={columns}
        dataSource={usersList}
        pagination={{
          position: ["bottomCenter"],
          size: "default",
          pageSize: 20,
          showSizeChanger: false,
        }}
        loading={!success}
        scroll={{
          x: 1000,
        }}
        className="w-screen sm:w-auto "
      />
    </div>
  );
};

export default Users;
