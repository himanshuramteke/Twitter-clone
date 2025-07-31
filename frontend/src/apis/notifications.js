import axiosInstance from "../config/axiosConfig";

export const sendNotificationApi = async () => {
  try {
    const response = await axiosInstance.get("/notifications");
    return response.data;
  } catch (error) {
    console.log("Error in SendNotificationApi", error);
    throw new Error(
      error?.response?.data?.message || "Send Notification failed"
    );
  }
};

export const deleteNotificationApi = async () => {
  try {
    const response = await axiosInstance.delete("/notifications");
    return response.data;
  } catch (error) {
    console.log("Error in deleteNotificationApi", error);
    throw new Error(
      error?.response?.data?.message || "delete Notification failed"
    );
  }
};
