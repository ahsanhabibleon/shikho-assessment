import { gql } from "@apollo/client";

export const LOAD_USERS = gql`
  query UserQueries {
    users {
      id
      data {
        email
        first_name
        phone
      }
    }
  }
`;

export const LOAD_POSTS = gql`
  query PostQuery {
    posts {
      id
      comments {
        data {
          body
        }
      }
      data {
        title
        body {
          markdown
        }
      }
    }
  }
`;

export const LOAD_COMMENTS = gql`
  query CommentSQueries {
    comments {
      id
      data {
        body
      }
    }
  }
`;
export const LOAD_USER = gql`
  query singleUserQuery($id: String!) {
    user(_id: $id) {
      data {
        email
        first_name
        phone
        avatar {
          url
        }
      }
    }
  }
`;

export const LOAD_POST = gql`
  query singlePostQuery($id: String!) {
    post(_id: $id) {
      data {
        title
        body {
          html
        }
      }
    }
  }
`;
export const LOAD_COMMENT = gql`
  query singleCommentQuery($id: String!) {
    comment(_id: $id) {
      data {
        body
      }
    }
  }
`;
export const SAMPLE_QUERY = gql`
  query SampleQueries {
    users {
      id
      data {
        email
        first_name
        phone
      }
    }
    posts {
      id
      data {
        title
        body {
          text
        }
      }
    }
    user(_id: "") {
      id
      data {
        email
        first_name
        phone
        avatar {
          url
        }
      }
    }
    post(_id: "") {
      id
      data {
        title
        body {
          text
        }
      }
    }
    comments {
      id
      data {
        body
      }
    }
    comment(_id: "") {
      id
      data {
        body
      }
    }
  }
`;
