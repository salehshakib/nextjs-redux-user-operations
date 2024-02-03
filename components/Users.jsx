"use client";
import { Image } from "next/image";
import { Table } from "antd";

const Users = () => {
  const columns = [
    {
      title: "",
      dataIndex: "image",
      key: "image",
      fixed: "left",
      width: 35,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: 180,
      className: "py-0",
    },
    {
      title: "Birthdate",
      dataIndex: "createdAt",
      key: "created",
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

  // list?.map((item) => {
  //   return usersList.push({
  //     key: id,
  //     image: (
  //       <div className="w-8 h-8 rounded-full overflow-hidden">
  //         <Image
  //           // src={profile_image ? profile_image?.path ?? defaultUserProfile : defaultUserProfile}
  //           alt="user-image"
  //           className="w-full h-full object-cover"
  //         />
  //       </div>
  //     ),
  //     name: (
  //       <div className="flex flex-col">
  //         <div
  //           // className={`inline-block ${!user && 'pointer-events-none'} hover:cursor-pointer`}
  //           key={id}
  //         ></div>
  //         <span className="text-xs text-primary dark:text-white60 ">
  //           {/* {!user ? "" : email} */}
  //         </span>
  //       </div>
  //     ),
  //   });
  // });

  return (
    <>
      <Table
        size="small"
        columns={columns}
        // dataSource={depositHistoryList}
        // pagination={
        //   paginate?.total > 20 && {
        //     position: ["bottomCenter"],
        //     defaultCurrent: 1,
        //     total: paginate.total,
        //     pageSize: 20,
        //     current: page,
        //     onChange: (page) => {
        //       // queryClient.invalidateQueries('getDepositHistory');
        //       // getData(page);
        //     },
        //   }
        // }
        scroll={{
          x: 1000,
        }}
      />
    </>
  );
};

export default Users;
