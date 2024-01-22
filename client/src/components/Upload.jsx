import { CloseOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { makeRequest } from "../axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;
const Wrapper = styled.div`
  width: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;
const Close = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  background-color: transparent;
  outline: none;
  padding: 10px;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 5px;
  color: ${({ theme }) => theme.text};
  padding: 10px;
  background-color: transparent;
  outline: none;
`;

const Label = styled.label`
  font-size: 14px;
`;

const Upload = ({ setOpen }) => {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPer, setImgPer] = useState(0);
  const [videoPer, setVideoPer] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImgPer(Math.round(progress))
          : setVideoPer(Math.round(progress));

        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const handleUpload = async () => {
    const res = await makeRequest.post(`videos`, {
      ...inputs,
      tags,
    });
    setOpen(false);
    res.status === 200 && navigate(`/video/${res.data._id}`);
  };

  return (
    <Container>
      <Wrapper>
        <Close>
          <CloseOutlined onClick={() => setOpen(false)} />
        </Close>
        <Title>Upload New Video</Title>
        <Label>Video :</Label>
        {videoPer > 0 ? (
          <progress value={videoPer} max="100" />
        ) : (
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        )}
        <Input
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
        />
        <Desc
          placeholder="Description"
          rows={8}
          name="desc"
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Separate tags with commas."
          onChange={(e) => setTags(e.target.value.split(","))}
        />
        <Label>Image :</Label>
        {imgPer > 0 ? (
          <progress value={imgPer} max="100" />
        ) : (
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        <Button onClick={handleUpload} variant="contained">
          Upload
        </Button>
      </Wrapper>
    </Container>
  );
};

export default Upload;
