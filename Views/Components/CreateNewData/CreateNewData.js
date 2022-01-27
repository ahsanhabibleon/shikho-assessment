import React from "react";
import {
  CREATE_POST,
  CREATE_USER,
  CREATE_COMMENTS,
} from "../../../GraphQL/Mutations";
import { useMutation } from "@apollo/client";
import Button from "../../Molicules/Button/Button";
import {
  LOAD_COMMENTS,
  LOAD_POSTS,
  LOAD_USERS,
} from "../../../GraphQL/Queries";
function CreateNewData(props) {
  const { type } = props;
  const [RegisterUser] = useMutation(CREATE_USER);
  const [CreatePost] = useMutation(CREATE_POST);
  const [CreateComments] = useMutation(CREATE_COMMENTS);

  const allMutations = {
    users: {
      func: RegisterUser,
      payload: { secret: "gulsug", phone: "0123s4s59" },
    },
    posts: {
      func: CreatePost,
      payload: { title: "Shei Title", html: "Shei vai, shei" },
    },
    comments: {
      func: CreateComments,
      payload: { body: "This is the body of this post!" },
    },
  };

  const queries = {
    users: LOAD_USERS,
    posts: LOAD_POSTS,
    comments: LOAD_COMMENTS,
  };

  const createNewData = (type) => () => {
    allMutations[type].func({
      variables: allMutations[type].payload,
      refetchQueries: [{ query: queries[type] }],
    });
  };
  return (
    <Button
      text={`Create new ${type.slice(0, -1)}`}
      onClick={createNewData(type)}
    />
  );
}

export default CreateNewData;
