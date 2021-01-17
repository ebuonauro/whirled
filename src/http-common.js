import axios from "axios";

export default axios.create({
  baseURL: "http://whirled:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});