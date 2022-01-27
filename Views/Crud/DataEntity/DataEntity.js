import { useQuery } from "@apollo/client";
import React, { useRef, useState } from "react";
import { LOAD_COMMENT, LOAD_POST, LOAD_USER } from "../../../GraphQL/Queries";
import RichTextEditor from "../../Components/RichTextEditor";
import Button from "../../Molicules/Button/Button";
import Styles from "./Entity.module.scss";
import SearchAndTag from "./SearchAndTag";

const DataEntity = (props) => {
  const { activeDataType, activeData } = props;
  const userNameRef = useRef(null);
  const addressRef = useRef(null);
  const searchAndTagRef = useRef(null);
  const titleRef = useRef(null);

  const specificData = {};
  const [postTitle, setPostTitle] = useState(specificData.title || "");

  const handleDataUpdate = (type) => (event) => {
    event.preventDefault();
    const data = {
      name: userNameRef.current?.value || null,
      address: addressRef.current?.value || null,
      searchAndTag: searchAndTagRef.current?.value || null,
      titleRef: titleRef.current?.value || null,
    };
    console.log({ data });
  };
  console.log({ activeDataType, activeData });
  const text = () => {
    if (activeDataType === "posts") {
      const { loading, error, data } = useQuery(LOAD_POST, {
        variables: { id: activeData.id },
      });
      // setPostTitle(data?.post?.data?.title);
      specificData.title = data?.post?.data?.title;
      specificData.body = data?.post?.data?.body?.html;
    } else if (activeDataType === "users") {
      const { error, loading, data, refetch } = useQuery(LOAD_USER, {
        variables: { id: activeData.id },
      });
      // specificData.title = data?.post?.data?.title;
      // specificData.body = data?.post?.data?.body?.html;
    } else if (activeDataType === "comments") {
      const { error, loading, data, refetch } = useQuery(LOAD_COMMENT, {
        variables: { id: activeData.id },
      });
      specificData.body = data?.comment?.data?.body;
    } else {
      return {};
    }
  };
  text();
  console.log({ specificData });

  return (
    <div className={Styles["data-entity"]}>
      <form onSubmit={handleDataUpdate(activeDataType)}>
        <div className={Styles["data-entity-header"]}>
          <h3>Edit a {activeDataType.slice(0, -1)}</h3>
          <Button
            type="submit"
            // onClick={handleDataUpdate(activeDataType)}
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
                  value={specificData.name}
                  placeholder="Enter Name"
                  name="user-name"
                  ref={userNameRef}
                />
              </div>

              <div className={Styles["input-group"]}>
                <label htmlFor="user-address">Address</label>
                <input
                  id="user-name"
                  type="text"
                  value={specificData.address}
                  placeholder="Enter Address"
                  ref={addressRef}
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
                value={specificData.title}
                placeholder="Enter title"
                ref={titleRef}
              />
            </div>
          )}

          {(activeDataType === "posts" || activeDataType === "comments") && (
            <div className={Styles["input-group"]}>
              <label>Body</label>
              <RichTextEditor value={specificData.body} />
            </div>
          )}

          <SearchAndTag activeDataType={activeDataType} ref={searchAndTagRef} />
        </div>
      </form>
    </div>
  );
};

export default DataEntity;
