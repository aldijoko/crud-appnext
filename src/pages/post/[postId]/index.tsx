import { Box, Text } from "@chakra-ui/react";
import axios from "axios";

// export async function getStaticPaths() {
//   const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
//   const data = await res.data;

//   const paths = data.map((post) => {
//     return {
//       params: { postId: `${post.id}` },
//     };
//   })

//   return {
//     paths,
//     fallback: false,
//   }
// }

interface Post {
  id: number;
  title: string;
  body: string;
  userId: string;
}

export async function getStaticPaths() {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  const data = await res.data;

  const paths = data.map((post: Post) => {
    return {
      params: { postId: `${post.id}` },
    };
  });

  return {
    paths: paths,
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  );
  const data = res.data;
  return {
    props: {
      post: data,
    }, // will be passed to the page component as props
  };
}

const PostDetail = ({ post }) => {
  return (
    <Box w="100%" p={4}>
      <Text fontSize="2xl">User ID : {post.userId}</Text>

      <Text fontSize="2xl">Title : {post.title}</Text>

      <Text fontSize="2xl">Body : {post.body}</Text>
    </Box>
  );
};

export default PostDetail;
