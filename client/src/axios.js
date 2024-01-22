import axios from "axios";

export const makeRequest = axios.create({
    baseURL: "https://video-api-five.vercel.app/api/",
    withCredentials: true,
});