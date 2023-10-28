import axios from "axios";
import getApiLink from "../api";
// const apiURL = "blog-server-cstqow679-bhaveshg-22.vercel.app";
const apiURL = getApiLink();
console.log(apiURL);

async function getData() {
  const token = localStorage.getItem("token");

  try {
    console.log(`${apiURL}/data/getUserData`);
    const data = await axios.get(`${apiURL}/data/getUserData`, {
      headers: { token },
    });

    return data;
  } catch (error) {
    console.error();
  }
}

export const getUsername = async () => {
  const data = await getData();
  console.log(data);
  return data.data.user.username;
};

export const getUserData = async () => {
  try {
    const data = await getData();
    console.log(data);
    return data.data.user;
  } catch (error) {}
  return null;
};
