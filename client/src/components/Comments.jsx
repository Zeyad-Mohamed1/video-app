import styled from "styled-components";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import { makeRequest } from "../axios";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;
const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await makeRequest.get(`/comments/${videoId}`);
        setComment(res.data);
      } catch (err) {}
    };
    fetchComments();
  });

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser.img} />
        <Input placeholder="Add a comment..." />
      </NewComment>
      {comment.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;
