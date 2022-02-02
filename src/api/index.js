import Axios from "axios";

const url = "http://localhost:5000/api/v1";

export default Axios.create({
  baseURL: url,
  headers: {
    "Content-type": "application/json",
    Authorization: localStorage.getItem("token"),
  },
});

const v1 = `${url}/api/v1`;

export const addCustomerAPI = async (data) => {
  console.log(data);
  await Axios.post(`${v1}/customer`, data)
    .then((res) => {
      if (res.status === 201) {
        return res.data;
      }
    })
    .catch((err) => console.log(err));
};

export const getCustomerAPI = async () => {
  await Axios.get(`${v1}/customer`)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => err);
};
