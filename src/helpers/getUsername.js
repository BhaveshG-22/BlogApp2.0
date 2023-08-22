import axios from "axios";

async function getData() {
  const token = localStorage.getItem("token");

  try {
    const data = await axios.get(
      "https://blog2-0-server.onrender.com/data/getUserData",
      {
        headers: { token },
      }
    );

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
