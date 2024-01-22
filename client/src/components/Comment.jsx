import { useEffect, useState } from "react";
import styled from "styled-components";
import { format } from "timeago.js";
import { makeRequest } from "../axios";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Date = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
  font-weight: 400;
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const Comment = ({ comment }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await makeRequest.get(`/users/find/${comment.userId}`);
        setChannel(res.data);
      } catch (err) {}
    };
    fetchComment();
  }, [comment.userId]);
  return (
    <Container>
      <Avatar src={channel.img} />
      <Details>
        <Name>
          {channel.name}
          <Date>{format(comment.createdAt)}</Date>
        </Name>
        <Text>{comment.desc}</Text>
      </Details>
    </Container>
  );
};

export default Comment;
