import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";
import { makeRequest } from "../axios";

const Container = styled.div`
  width: ${({ type }) => type !== "sm" && "340px"};
  margin-bottom: ${({ type }) => (type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${({ type }) => (type === "sm" ? "flex" : "block")};
  gap: ${({ type }) => (type === "sm" ? "10px" : "0px")};
`;

const Image = styled.img`
  width: 100%;
  height: ${({ type }) => (type === "sm" ? "120px" : "202px")};
  object-fit: cover;
  flex: ${({ type }) => type === "sm" && "1"};
  border-radius: 20px;
  overflow: hidden;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${({ type }) => (type !== "sm" ? "16px" : "0px")};
  gap: 12px;
  flex: ${({ type }) => type === "sm" && "1"};
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${({ type }) => (type === "sm" ? "none" : "block")};
  margin-top: 15px;
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 0px 0px 5px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;
const Card = ({ type, video }) => {
  const [channel, setChannel] = useState({});
  const [err, setErr] = useState(false);

  useEffect(() => {
    try {
      const fetchChannel = async () => {
        const res = await makeRequest.get(`users/find/${video.userId}`);
        setChannel(res.data);
      };
      fetchChannel();
    } catch (err) {
      setErr(true);
    }
  }, [video.userId]);

  return (
    <Link
      to={`/video/${video._id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      {err && "Something went wrong"}
      <Container type={type}>
        <Image type={type} src={video.imgUrl} />
        <Details type={type}>
          <ChannelImage type={type} src={channel.img} />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel.name}</ChannelName>
            <Info>
              {video.views} views • {format(video.createdAt)}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
