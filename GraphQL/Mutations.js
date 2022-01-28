import { gql } from "@apollo/client";
export const CREATE_USER = gql`
  mutation RegisterUser($phone: String, $secret: String) {
    userRegister(phone: $phone, secret: $secret) {
      id
      id_token
      refresh_token
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: String!
    $name: String
    $email: String
    $phone: String
  ) {
    updateUser(
      _id: $id
      payload: { first_name: $name, email: $email, phone: $phone }
    ) {
      data {
        first_name
        phone
        email
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($title: String, $html: String) {
    createPost(
      local: en
      status: published
      payload: { title: $title, body: { html: $html } }
    ) {
      id
      comments {
        data {
          body
        }
      }
      data {
        body {
          html
          markdown
          text
        }
        title
      }
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($id: String!, $title: String, $html: String) {
    updatePost(_id: $id, payload: { title: $title, body: { html: $html } }) {
      id
      comments {
        data {
          body
        }
      }
      data {
        body {
          html
          markdown
          text
        }
        title
      }
    }
  }
`;
export const UPDATE_COMMENT = gql`
  mutation UpdateComment($id: String!, $body: String) {
    updateComment(_id: $id, payload: { body: $body }) {
      data {
        body
      }
    }
  }
`;
export const CONNECT_COMMENT_TO_POST = gql`
  mutation ConnectComment($id: String!, $comment_ids: [String]) {
    updatePost(_id: $id, connect: { comment_ids: $comment_ids }) {
      id
      comments {
        data {
          body
        }
      }
    }
  }
`;

export const TAG_POST_TO_COMMENT = gql`
  mutation TagPostToComment($id: String!, $post_id: String) {
    updateComment(_id: $id, connect: { post_id: $post_id }) {
      id
      post {
        id
      }
    }
  }
`;

export const CREATE_COMMENTS = gql`
  mutation CreateComments($body: String) {
    createComment(local: en, status: published, payload: { body: $body }) {
      id
      data {
        body
      }
      post {
        data {
          title
          body {
            html
            markdown
            text
          }
        }
        id
      }
    }
  }
`;
