import Axios from "axios";

const url = "http://localhost:5000/api/v1";
// const url = "https://support360crm.herokuapp.com/api/v1";

export const onAuthenticate = async (payload) => {
  const axios = Axios.create({
    baseURL: url,
    headers: {
      "Content-type": "application/json",
      Authorization: `${sessionStorage.getItem("token")}`,
    },
  });
  try {
    let res = await axios(payload.url, {
      method: payload.method,
      data: payload.data,
    });
    if (res.data.token) {
      sessionStorage.setItem("token", res.data.token);
    }
    return res;
  } catch (error) {
    return error;
  }
};
