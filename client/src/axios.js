import axios from "axios";

export const makeRequest = axios.create({
    baseURL: "https://fabulous-croissant-959d76.netlify.app/api",
    withCredentials: true,
});