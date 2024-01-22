import styled from "styled-components";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import { makeRequest } from "../axios";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);
  const [err, setErr] = useState(false);

  useEffect(() => {
    try {
      const fetchVideos = async () => {
        const res = await makeRequest.get(`videos/${type}`);
        setVideos(res.data);
      };
      fetchVideos();
    } catch (err) {
      setErr(true);
    }
  }, [type]);

  return (
    <Container>
      {err && "Something went wrong"}
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Home;
