import axiosInstance from "../config/axiosConfig";

export const signupApi = async ({ email, username, fullName, password }) => {
  try {
    const res = await axiosInstance.post("/auth/signup", {
      email,
      username,
      fullName,
      password,
    });
    console.log("Signup successfull");
    return res.data;
  } catch (error) {
    console.log("Error in signupApi request", error);
    throw new Error(error?.response?.data?.message || "Signup failed");
  }
};

export const loginApi = async ({ username, password }) => {
  try {
    const res = await axiosInstance.post("/auth/login", {
      username,
      password,
    });
    console.log("Login successfull");
    return res.data;
  } catch (error) {
    console.log("Error in loginApi request", error);
    throw new Error(error?.response?.data?.message || "Login failed");
  }
};

export const logoutApi = async () => {
  try {
    const res = await axiosInstance.post("/auth/logout");
    console.log("Logout successfull");
    return res.data;
  } catch (error) {
    console.log("Error in logoutApi request", error);
    throw new Error(error?.response?.data?.message || "Logout failed");
  }
};

export const getMeApi = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    console.log("Auth user is here:", res.data);
    return res.data;
  } catch (error) {
    console.log("Error in getmeApi", error);
    return null;
  }
};
