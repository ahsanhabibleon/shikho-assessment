import React from "react";
import {
  CREATE_POST,
  CREATE_USER,
  CREATE_COMMENTS,
  UPDATE_USER,
} from "../../../GraphQL/Mutations";
import { useMutation } from "@apollo/client";
import Button from "../../Molicules/Button/Button";
import {
  LOAD_COMMENTS,
  LOAD_POSTS,
  LOAD_USERS,
} from "../../../GraphQL/Queries";
function CreateNewData(props) {
  const { type, clearFields, createMode } = props;
  const [RegisterUser, userData] = useMutation(CREATE_USER);
  const [UpdateUser] = useMutation(UPDATE_USER);
  const [CreatePost] = useMutation(CREATE_POST);
  const [CreateComments] = useMutation(CREATE_COMMENTS);
  const allMutations = {
    users: {
      func: RegisterUser,
      payload: {
        secret: "gulssfssdfssssdfdfdsdffsdffsdfdfug",
        phone: "012sdfsdsdfsdssdfdfsdfff3ssdf4sdfsdfs59",
      },
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
    clearFields();
    allMutations[type]
      .func({
        variables: allMutations[type].payload,
        refetchQueries: [{ query: queries[type] }],
      })
      .then(({ data }) => {
        console.log({ datamata: data });
        if (type === "users") {
          UpdateUser({
            variables: {
              id: data.userRegister.id,
              first_name: "Allu",
              phone: "030303",
              email: "tisd@lsdj.com",
            },
          }).then((data) => {
            console.log({ hayreData: data });
          });
        }
      });
  };
  return (
    <Button
      text={
        !createMode ? `Create new ${type.slice(0, -1)}` : "Exit create mode"
      }
      onClick={createNewData(type)}
    />
  );
}

export default CreateNewData;
