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

export const FollowUnfollowUsersApi = async (userId) => {
  try {
    const response = await axiosInstance.post(`/users/follow/${userId}`);
    return response.data;
  } catch (error) {
    console.log("Error in FollowUnfollowUsersApi", error);
    throw new Error(error?.response?.data?.message || "Follow Unfollow failed");
  }
};

export const getUserProfileApi = async (username) => {
  try {
    const response = await axiosInstance.get(`/users/profile/${username}`);
    return response.data;
  } catch (error) {
    console.log("Error in getUserProfileApi", error);
    throw new Error(
      error?.response?.data?.message || "get user profile failed"
    );
  }
};
