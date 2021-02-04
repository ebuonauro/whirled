import axios from "axios";

export default axios.create({
  baseURL: "https://alo-whirled-api.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});