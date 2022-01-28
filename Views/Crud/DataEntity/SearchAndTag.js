import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  CONNECT_COMMENT_TO_POST,
  TAG_POST_TO_COMMENT,
} from "../../../GraphQL/Mutations";
import {
  LOAD_COMMENTS,
  LOAD_COMMENTS_IN_A_POST,
  LOAD_POSTS,
  LOAD_POST_RELATED_TO_COMMENT,
} from "../../../GraphQL/Queries";
import TypeAheadSearchBox from "../../Components/TypeAheadSearchBox";
import Styles from "./Entity.module.scss";

const SearchAndTag = ({ activeDataType, value, activeDataId }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [ConnectComment] = useMutation(CONNECT_COMMENT_TO_POST);
  const [TagPostToComment] = useMutation(TAG_POST_TO_COMMENT);
  useEffect(() => {
    setSelectedItems([]);
  }, [activeDataId]);

  const searchTagSubtitle = () => {
    switch (activeDataType) {
      case "users":
        return "Search Posts And Tag";
      case "posts":
        return "Search Comments And Assign it To the Post ";
      case "comments":
        return "Search A Post and Tag this Comment ";

      default:
        break;
    }
  };

  const getRelatedPostsOrComments = () => {
    switch (activeDataType) {
      // case "users":
      //   return useQuery(LOAD_USER, {
      //     variables: { id: activeDataId },
      //   });

      case "posts":
        return useQuery(LOAD_COMMENTS_IN_A_POST, {
          variables: { id: activeDataId },
        });
      case "comments":
        return useQuery(LOAD_POST_RELATED_TO_COMMENT, {
          variables: { id: activeDataId },
        });

      default:
        return [];
    }
  };

  const relatedPostOrCommentIds =
    activeDataType === "posts"
      ? getRelatedPostsOrComments()?.data?.post?.comments?.map((com) => com?.id)
      : [getRelatedPostsOrComments().data?.comment?.post?.id];

  const { data: allPostsOrComments } =
    activeDataType === "users" || activeDataType === "comments"
      ? useQuery(LOAD_POSTS)
      : useQuery(LOAD_COMMENTS);

  const optionArrayToSearch =
    activeDataType === "posts"
      ? allPostsOrComments?.comments
          ?.filter((data) => !relatedPostOrCommentIds?.includes(data.id))
          ?.map((data) => ({
            label: data?.data?.body,
            id: data?.id,
          }))
      : allPostsOrComments?.posts
          ?.filter((data) => !relatedPostOrCommentIds?.includes(data.id))
          ?.map((data) => ({
            label: data?.data?.title,
            id: data?.id,
          }));

  const allUpdateMutations = (item) => ({
    posts: {
      func: ConnectComment,
      payload: {
        id: activeDataId,
        comment_ids: [item.id],
      },
    },
    comments: {
      func: TagPostToComment,
      payload: { id: activeDataId, post_id: item.id },
    },
  });

  const queries = {
    posts: LOAD_POSTS,
    comments: LOAD_COMMENTS,
  };

  const handleDataUpdate = (type, selectedItem) => {
    allUpdateMutations(selectedItem[0])[type].func({
      variables: allUpdateMutations(selectedItem[0])[type].payload,
      refetchQueries: () => [
        {
          query: queries[type],
        },
      ],
    });
  };

  const tagSelectedItem = (selected) => {
    if (selected.length) {
      setSelectedItems([...selectedItems, selected[0]]);
      handleDataUpdate(activeDataType, selected);
    }
  };

  return (
    <div className={Styles["input-group"]}>
      <label htmlFor="tag">
        {activeDataType === "users" || activeDataType === "comments"
          ? "Post"
          : "Comment"}
      </label>
      <p className={Styles.subtitle}>{searchTagSubtitle()}</p>
      <TypeAheadSearchBox
        options={optionArrayToSearch}
        handleSelected={tagSelectedItem}
      />
      <div className={Styles["tags"]}>
        {selectedItems &&
          selectedItems?.map((item, idx) => (
            <span className={Styles["tag-item"]} key={item?.id || idx}>
              <span className={Styles["tag-inner-txt"]}>{item?.label}</span>
              <span className={Styles["close-icon"]}>x</span>
            </span>
          ))}
      </div>
    </div>
  );
};

export default SearchAndTag;
