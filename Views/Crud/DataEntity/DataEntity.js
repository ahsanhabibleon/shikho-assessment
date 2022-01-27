import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { UPDATE_POST, UPDATE_COMMENT } from "../../../GraphQL/Mutations";
import {
  LOAD_COMMENT,
  LOAD_COMMENTS,
  LOAD_POST,
  LOAD_POSTS,
  LOAD_USER,
  LOAD_USERS,
} from "../../../GraphQL/Queries";
import Button from "../../Molicules/Button/Button";
import Styles from "./Entity.module.scss";
import SearchAndTag from "./SearchAndTag";
import CreateNewData from "../../Components/CreateNewData";

const DataEntity = (props) => {
  const { activeDataType, activeData } = props;
  const [UpdatePost, updatePostData] = useMutation(UPDATE_POST);
  const [UpdateComment, updateCommentData] = useMutation(UPDATE_COMMENT);

  const comments = updatePostData?.data?.updatePost?.comments || [];
  console.log({ comments });

  const [specificData, setSpecificData] = useState({
    title: "",
    name: "",
    address: "",
    post: "",
    comment: "",
    searchTxt: "",
  });

  const [createMode, setCreateMode] = useState(false);

  //get data from useQuery hook depending on active tab
  const getDataFromQuery = () => {
    if (activeDataType === "posts") {
      return useQuery(LOAD_POST, {
        variables: { id: activeData.id },
      });
    } else if (activeDataType === "users") {
      return useQuery(LOAD_USER, {
        variables: { id: activeData.id },
      });
    } else {
      return useQuery(LOAD_COMMENT, {
        variables: { id: activeData.id },
      });
    }
  };

  //get error, loading and data from query
  const dataFromQuery = getDataFromQuery();

  //update data
  const handleInputChange = (param) => (e) => {
    console.log({ e });
    setSpecificData({
      ...specificData,
      [param]: e.target.value,
    });
  };
  const allMutations = {
    // users: {
    //   func: RegisterUser,
    //   payload: { secret: "gulsug", phone: "0123s4s59" },
    // },
    posts: {
      func: UpdatePost,
      payload: {
        id: activeData.id,
        title: specificData.title,
        html: specificData.post,
      },
    },
    comments: {
      func: UpdateComment,
      payload: { id: activeData.id, body: specificData.comment },
    },
  };
  const queries = {
    users: LOAD_USERS,
    posts: LOAD_POSTS,
    comments: LOAD_COMMENTS,
  };
  const handleDataUpdate = (type) => () => {
    allMutations[type].func({
      variables: allMutations[type].payload,
      refetchQueries: () => [
        {
          query: queries[type],
        },
      ],
    });
  };

  //Clear all fields
  const clearFields = (type) => {
    switch (type) {
      case "posts":
        setSpecificData({ ...specificData, title: "", post: "" });
        break;

      case "comments":
        setSpecificData({ ...specificData, comment: "" });
        break;

      default:
        setSpecificData({ ...specificData });
        break;
    }
  };

  //Reset specific data when the data changes
  useEffect(() => {
    createMode
      ? clearFields(activeDataType)
      : setSpecificData({
          ...specificData,
          title: dataFromQuery.data?.post?.data?.title,
          post: dataFromQuery.data?.post?.data?.body?.html,
          comment: dataFromQuery.data?.comment?.data?.body,
        });
  }, [dataFromQuery.data, createMode]);

  return (
    <div className={Styles["data-entity"]}>
      <div className={Styles["data-entity-header"]}>
        <h3>Edit a {activeDataType.slice(0, -1)}</h3>
        {activeDataType && (
          <CreateNewData
            createMode={createMode}
            type={activeDataType}
            clearFields={() => setCreateMode(!createMode)}
          />
        )}
        <Button
          type="submit"
          onClick={handleDataUpdate(activeDataType)}
          text="UPDATE"
          icon={
            <svg
              width="18"
              height="18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15 18H9a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3ZM9 8a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H9Z" />
              <path d="M6.73 12H2.67A2.68 2.68 0 0 1 0 9.33V2.67A2.68 2.68 0 0 1 2.67 0h6.66A2.68 2.68 0 0 1 12 2.67V6.4h-2V2.67A.67.67 0 0 0 9.33 2H2.67a.67.67 0 0 0-.67.67v6.66a.67.67 0 0 0 .67.67h4.06v2Z" />
            </svg>
          }
        />
      </div>

      <div className={Styles["edit-data-form-wrapper"]}>
        {activeDataType === "users" && (
          <>
            <div className={Styles["input-group"]}>
              <label htmlFor="user-name">Name</label>
              <input
                id="user-name"
                type="text"
                value={specificData?.name || ""}
                placeholder="Enter Name"
                name="user-name"
                onChange={handleInputChange("name")}
              />
            </div>

            <div className={Styles["input-group"]}>
              <label htmlFor="user-address">Address</label>
              <input
                id="user-name"
                type="text"
                value={specificData?.address || ""}
                placeholder="Enter Address"
                onChange={handleInputChange("address")}
              />
            </div>
          </>
        )}

        {activeDataType === "posts" && (
          <div className={Styles["input-group"]}>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={specificData?.title || ""}
              placeholder="Enter title"
              onChange={handleInputChange("title")}
            />
          </div>
        )}

        {(activeDataType === "posts" || activeDataType === "comments") && (
          <div className={Styles["input-group"]}>
            <label>Body</label>
            <textarea
              onChange={handleInputChange(
                activeDataType === "posts" ? "post" : "comment"
              )}
              // onChange={(data) => console.log(data)}
              // value={specificData?.post || specificData?.comment}
              value={
                activeDataType === "posts"
                  ? specificData?.post
                  : specificData?.comment
              }
              placeholder="Enter text..."
            />
          </div>
        )}

        <SearchAndTag
          activeDataType={activeDataType}
          value={specificData?.searchTxt || ""}
          onChange={handleInputChange("searchTxt")}
        />
      </div>
    </div>
  );
};

export default DataEntity;
