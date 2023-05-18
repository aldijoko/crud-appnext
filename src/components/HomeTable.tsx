import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const HomeTable = () => {
  const [postData, setPostData] = useState([]);
  const { isOpen: isAddData, onOpen: onAddData, onClose } = useDisclosure();
  const {
    isOpen: isEditData,
    onOpen: onEditData,
    onClose: onCloseEditData,
  } = useDisclosure();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

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

  const onSubmit = async (values) => {
    const { data } = await axios.post(
      `https://jsonplaceholder.typicode.com/posts`,
      values
    );
    toast({
      title: "Submitted on Bottom Table!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setPostData([...postData, data]);
    onClose();
  };

  interface Post {
    title: string;
    body: string;
    userId: string;
  }

  const updatePost = async () => {
    const { data } = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${post.id}}`,
      {
        title: post.title,
        body: post.body,
        userId: post.userId,
      }
    );
    setPostData(data);

    toast({
      title: "Update Data",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const deletePost = async (post) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${post.id}`);
    const deleteData = postData.filter((p) => p.id !== post.id);
    toast({
      title: "Delete Data",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    setPostData(deleteData);
  };
  return (
    <>
      <Box px={10}>
        <Box py={8}>
          <Button colorScheme="blue" padding={5} onClick={onAddData}>
            Add Post
          </Button>

          <Modal isOpen={isAddData} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add Data Post</ModalHeader>
              <ModalBody>
                <Box px={5} py={5}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl isInvalid={errors.userId}>
                      <FormLabel htmlFor="userid">User ID</FormLabel>
                      <Input
                        type="number"
                        id="userId"
                        placeholder="User Id"
                        {...register("userId", {
                          required: "This is required",
                          minLength: {
                            value: 1,
                            message: "Value should be number",
                          },
                        })}
                      />
                      <FormErrorMessage>
                        {errors.userId && errors.userId.message}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.title}>
                      <FormLabel htmlFor="title">Title</FormLabel>
                      <Input
                        id="title"
                        placeholder="Title"
                        {...register("title", {
                          required: "This is required",
                          minLength: {
                            value: 4,
                            message: "Minimum length should be 4",
                          },
                        })}
                      />
                      <FormErrorMessage>
                        {errors.title && errors.title.message}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.body}>
                      <FormLabel htmlFor="body">Body</FormLabel>
                      <Input
                        id="body"
                        placeholder="Body"
                        {...register("body", {
                          required: "This is required",
                          minLength: {
                            value: 4,
                            message: "Minimum length should be 4",
                          },
                        })}
                      />
                      <FormErrorMessage>
                        {errors.body && errors.body.message}
                      </FormErrorMessage>
                    </FormControl>
                    <Button
                      mt={4}
                      colorScheme="teal"
                      type="submit"
                      isLoading={isSubmitting}
                    >
                      Submit
                    </Button>
                  </form>
                </Box>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>

        <Modal isOpen={isEditData} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Data Post</ModalHeader>
            <ModalBody>
              <Box px={5} py={5}>
                <form onSubmit={handleSubmit(updatePost)}>
                  <FormControl isInvalid={errors.userId}>
                    <FormLabel htmlFor="userid">User ID</FormLabel>
                    <Input
                      type="number"
                      id="userId"
                      placeholder="User Id"
                      {...register("userId", {
                        required: "This is required",
                        minLength: {
                          value: 1,
                          message: "Value should be number",
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {errors.userId && errors.userId.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.title}>
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <Input
                      id="title"
                      placeholder="Title"
                      {...register("title", {
                        required: "This is required",
                        minLength: {
                          value: 4,
                          message: "Minimum length should be 4",
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {errors.title && errors.title.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.body}>
                    <FormLabel htmlFor="body">Body</FormLabel>
                    <Input
                      id="body"
                      placeholder="Body"
                      {...register("body", {
                        required: "This is required",
                        minLength: {
                          value: 4,
                          message: "Minimum length should be 4",
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {errors.body && errors.body.message}
                    </FormErrorMessage>
                  </FormControl>
                  <Button
                    mt={4}
                    colorScheme="teal"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Edit
                  </Button>
                </form>
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onCloseEditData}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

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
                <Th>Detail</Th>
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
                      <Button
                        colorScheme="blue"
                        padding={5}
                        onClick={onEditData}
                      >
                        Edit Post
                      </Button>
                    </Td>
                    <Td>
                      <button
                        onClick={() => deletePost(post)}
                        className="px-2 py-2 border rounded-md bg-red-500 text-white  hover:bg-red-300"
                      >
                        Delete
                      </button>
                    </Td>
                    <Td>
                      <Link href={`/post/${post.id}`}>
                        <button className="px-2 py-2 border rounded-md bg-blue-500 text-white  hover:bg-blue-300">
                          Detail
                        </button>
                      </Link>
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
