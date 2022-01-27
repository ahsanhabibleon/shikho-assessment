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
  mutation UpdateUser($id: String, $payload: Object) {
    updateUser(_id: $id, local: en, payload: $payload) {
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
  mutation UpdatePost($title: String, $payload: Object) {
    updatePost(_id: $id, payload: $payload) {
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
