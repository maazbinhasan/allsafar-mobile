import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "https://704e-2401-4900-1cb1-1d47-58f2-365e-a9c1-7811.ngrok-free.app/api",
    headers: {
      "Content-Type": "application/json",
    },
  });
  export default axiosInstance;
