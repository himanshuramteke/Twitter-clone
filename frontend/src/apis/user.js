import axiosInstance from "../config/axiosConfig";

export const getSuggestedUsersApi = async () => {
  try {
    const response = await axiosInstance.get("/users/suggested");
    return response.data;
  } catch (error) {
    console.log("Error in getSuggestedUsersApi", error);
    throw new Error(
      error?.response?.data?.message || "Get Suggested users failed"
    );
  }
};
