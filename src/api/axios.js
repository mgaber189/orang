import axios from "axios";
const URL = "http://ommargomma-001-site1.atempurl.com/api/"
export const instance = axios.create({
    baseURL: `${URL}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "X-Role": "client",
      "X-Language": "en",
    },
  });