import axios from "axios";

//product services
export default axios.create({
  baseURL: "http://localhost:8082",
  headers: { "content-type": "application/json" },
});
