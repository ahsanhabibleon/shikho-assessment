import React, { useEffect } from "react";
import DataPanel from "../DataPanel";
import { useQuery, gql } from "@apollo/client";
import {
  LOAD_POSTS,
  LOAD_USERS,
  LOAD_COMMENTS,
} from "../../../GraphQL/Queries";
import Divider from "../../Molicules/Divider";
import CreateNewData from "../../Components/CreateNewData";

function SpecificDataPanel(props) {
  const { activeDataType, setActiveData } = props;

  const dataList = [];
  if (activeDataType === "posts") {
    const { error, loading, data } = useQuery(LOAD_POSTS);
    data?.posts?.map((_data) => {
      dataList.push(
        { id: _data.id, title: _data?.data?.title } || {
          id: undefined,
          title: "No title",
        }
      );
    });
  } else if (activeDataType === "users") {
    const { error, loading, data } = useQuery(LOAD_USERS);
    console.log({ users: data });
    data?.users?.map((_data) => {
      dataList.push(_data?.data?.title || "No User");
      dataList.push(
        { id: _data.id, title: _data?.data?.title } || {
          id: undefined,
          title: "No title",
        }
      );
    });
  } else if (activeDataType === "comments") {
    const { error, loading, data } = useQuery(LOAD_COMMENTS);
    console.log(data);
    data?.comments?.map((_data) => {
      dataList.push(
        { id: _data.id, title: _data?.data?.body } || {
          id: undefined,
          title: "No title",
        }
      );
    });
  } else {
    return [...dataList];
  }

  return (
    <div className="">
      <DataPanel
        dataList={dataList}
        activeDataType={activeDataType}
        setActiveDataType={setActiveData}
        icon={
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 12H7V13H2V12Z" fill="black" />
            <path d="M2 9H7V10H2V9Z" fill="black" />
            <path
              d="M13 7H3C2.73478 7 2.48043 6.89464 2.29289 6.70711C2.10536 6.51957 2 6.26522 2 6V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H13C13.2652 2 13.5196 2.10536 13.7071 2.29289C13.8946 2.48043 14 2.73478 14 3V6C14 6.26522 13.8946 6.51957 13.7071 6.70711C13.5196 6.89464 13.2652 7 13 7ZM3 3V6H13V3H3Z"
              fill="black"
            />
            <path
              d="M13 14H10C9.73478 14 9.48043 13.8946 9.29289 13.7071C9.10536 13.5196 9 13.2652 9 13V10C9 9.73478 9.10536 9.48043 9.29289 9.29289C9.48043 9.10536 9.73478 9 10 9H13C13.2652 9 13.5196 9.10536 13.7071 9.29289C13.8946 9.48043 14 9.73478 14 10V13C14 13.2652 13.8946 13.5196 13.7071 13.7071C13.5196 13.8946 13.2652 14 13 14ZM10 10V13H13V10H10Z"
              fill="black"
            />
          </svg>
        }
      />
      {activeDataType && (
        <>
          <Divider height="20px" />
          <CreateNewData type={activeDataType} />
        </>
      )}
    </div>
  );
}

export default SpecificDataPanel;