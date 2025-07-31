import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "../apis/user";
import toast from "react-hot-toast";

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: updateProfile, isPending: isUpdatingProfile } =
    useMutation({
      mutationFn: updateUserProfile,
      onSuccess: () => {
        toast.success("Profile updated successfully");
        Promise.all([
          queryClient.invalidateQueries({ queryKey: ["authUser"] }),
          queryClient.invalidateQueries({ queryKey: ["userProfile"] }),
        ]);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return {
    updateProfile,
    isUpdatingProfile,
  };
};
