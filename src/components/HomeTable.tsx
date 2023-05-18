import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const HomeTable = () => {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const { data: res } = data;
      setPostData(res);
    };

    getData();
  }, []);

  const deletePost = async (post) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${post.id}`);
    const deleteData = postData.filter((p) => p.id !== post.id);
    setPostData(deleteData);
  };
  return (
    <>
      <Box px={10}>
        <button className="px-5 py-2 my-5 border rounded-md bg-blue-600 text-white hover:bg-white hover:text-black">
          Add Post
        </button>
        <TableContainer>
          <Table variant="striped" size="md">
            <Thead>
              <Tr>
                {/* <Th>Id</Th> */}
                <Th>User Id</Th>
                <Th>Title</Th>
                <Th>Body</Th>
                <Th>Update</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {postData.map((post) => {
                return (
                  <Tr h={10} key={post.id}>
                    {/* <Td>{post.id}</Td> */}
                    <Td>{post.userId}</Td>
                    <Td>{post.title}</Td>
                    <Td>{post.body}</Td>
                    <Td>
                      <button className="px-2 py-2 border rounded-md bg-green-500 text-white  hover:bg-red-400">
                        Update
                      </button>
                    </Td>
                    <Td>
                      <button
                        onClick={() => deletePost(post)}
                        className="px-2 py-2 border rounded-md bg-red-500 text-white  hover:bg-red-300"
                      >
                        Delete
                      </button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default HomeTable;
