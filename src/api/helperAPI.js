import axios from "axios";
import { toast } from "react-toastify";

export const postAPI = async (url, body) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(url, JSON.stringify(body), {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (res.data) {
      if (res.data.message)
        toast.success(res.data.message, {
          theme: "dark",
        });
      return res.data;
    } else {
      toast.error(res.data.error, {
        theme: "dark",
      });
      return;
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.error, {
      theme: "dark",
    });
    return;
  }
};

export const getAPI = async (url) => {
  try {
    const res = await axios.get(url);
    if (res.data) {
      if (res.data.message)
        toast.success(res.data.message, {
          theme: "dark",
        });
      return res.data;
    } else {
      toast.error(res.data.error, {
        theme: "dark",
      });
      return;
    }
  } catch (error) {
    toast.error(error.response?.data.error, {
      theme: "dark",
    });
    return;
  }
};
