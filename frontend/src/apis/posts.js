import axiosInstance from "../config/axiosConfig";

export const getPostsApi = async (feedType) => {
  let endpoint = "/posts/all";

  if (feedType === "following") {
    endpoint = "/posts/following";
  }

  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message ||
        "Something went wrong while fetching posts"
    );
  }
};

export const deletePostApi = async (postId) => {
  try {
    const response = await axiosInstance.delete(`/posts/delete/${postId}`);
    return response.data;
  } catch (error) {
    console.log("Error in deletePost Api", error);
    throw new Error(error?.response?.data?.message || "Delete Post failed");
  }
};
