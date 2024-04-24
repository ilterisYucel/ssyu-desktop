import axios from "axios";
// http://3.70.166.110:8080
const client = axios.create({
  baseURL: "http://3.70.166.110:3000/",
  timeout: 3000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

export { client };
