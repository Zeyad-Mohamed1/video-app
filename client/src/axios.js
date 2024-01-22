import axios from "axios";

export const makeRequest = axios.create({
    baseURL: "https://video-app-api-six.vercel.app/api/",
    withCredentials: true,
});