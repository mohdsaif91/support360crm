import Axios from "axios";

const url = "http://localhost:5000/api/v1";

export default Axios.create({
  baseURL: url,
  headers: {
    "Content-type": "application/json",
    Authorization: sessionStorage.getItem("token"),
  },
});
