import { FaRegComment, FaHeart, FaRegHeart } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deletePostApi,
  likeUnlikePostApi,
  PostCommentApi,
} from "../../apis/posts";
import { toast } from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
import { getMeApi } from "../../apis/auth";
import { formatDistanceToNow } from "date-fns";

const Post = ({ post }) => {
  const [comment, setComment] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: getMeApi,
  });

  const queryClient = useQueryClient();

  // Format post date
  const formattedDate = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
  });

  const { mutate: deletePost, isPending: isDeleting } = useMutation({
    mutationFn: deletePostApi,
    onSuccess: () => {
      toast.success("Post deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const { mutate: likePost, isPending: isLiking } = useMutation({
    mutationFn: (postId) => likeUnlikePostApi(postId),
    onMutate: async (postId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      // Snapshot the previous value
      const previousPosts = queryClient.getQueryData(["posts"]);

      // Optimistically update to the new value
      queryClient.setQueryData(["posts"], (old) => {
        return (
          old?.map((prevPost) => {
            if (prevPost._id === postId) {
              const isLiked = prevPost.likes.includes(authUser._id);
              return {
                ...prevPost,
                likes: isLiked
                  ? prevPost.likes.filter((id) => id !== authUser._id)
                  : [...prevPost.likes, authUser._id],
              };
            }
            return prevPost;
          }) || []
        );
      });

      // Return context with the snapshotted value
      return { previousPosts };
    },
    onError: (error, postId, context) => {
      // Rollback to previous value
      queryClient.setQueryData(["posts"], context.previousPosts);
      toast.error(error.message || "Failed to update like");
    },
    onSettled: () => {
      // Ensure UI is consistent with server state
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const { mutate: commentPost, isPending: isCommenting } = useMutation({
    mutationFn: PostCommentApi,
    onSuccess: () => {
      toast.success("Comment posted successfully");
      setComment("");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const postOwner = post.user;
  const isLiked = post.likes.includes(authUser._id);
  const isMyPost = authUser._id === post.user._id;

  const handleDeletePost = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(post._id);
    }
  };

  const handleLikePost = () => {
    if (isLiking) return;
    likePost(post._id);
  };

  const handlePostComment = (e) => {
    console.log("Commented");
    e.preventDefault();
    if (isCommenting) return;
    commentPost({ postId: post._id, text: comment });
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(
      isBookmarked ? "Removed from bookmarks" : "Added to bookmarks"
    );
  };

  return (
    <div className="flex gap-3 items-start p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
      {/* User Avatar */}
      <div className="avatar mt-1">
        <Link
          to={`/profile/${postOwner.username}`}
          className="w-10 h-10 rounded-full overflow-hidden"
        >
          <img
            src={postOwner.profileImg || "/avatar-placeholder.png"}
            alt={postOwner.fullName}
            className="w-full h-full object-cover"
          />
        </Link>
      </div>

      {/* Post Content */}
      <div className="flex-1">
        {/* User Info */}
        <div className="flex items-center gap-2 mb-1">
          <Link
            to={`/profile/${postOwner.username}`}
            className="font-bold hover:underline"
          >
            {postOwner.fullName}
          </Link>
          <span className="text-gray-500 text-sm">
            @{postOwner.username} · {formattedDate}
          </span>

          {isMyPost && (
            <button
              className="ml-auto text-gray-500 hover:text-red-500 transition-colors"
              onClick={handleDeletePost}
              disabled={isDeleting}
            >
              {isDeleting ? <LoadingSpinner size="sm" /> : <FaTrash />}
            </button>
          )}
        </div>

        {/* Post Body */}
        <div className="mb-3">
          <p className="mb-3">{post.text}</p>
          {post.img && (
            <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <img
                src={post.img}
                className="w-full object-contain max-h-[500px]"
                alt="Post content"
              />
            </div>
          )}
        </div>

        {/* Engagement Bar */}
        <div className="flex justify-between max-w-[90%]">
          {/* Comments */}
          <button
            className="flex items-center gap-1 text-gray-500 hover:text-blue-500 group"
            onClick={() =>
              document.getElementById(`comments_modal${post._id}`).showModal()
            }
          >
            <div className="p-2 rounded-full group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
              <FaRegComment className="w-4 h-4" />
            </div>
            <span className="text-sm">{post.comments.length}</span>
          </button>

          {/* Reposts */}
          <button className="flex items-center gap-1 text-gray-500 hover:text-green-500 group">
            <div className="p-2 rounded-full group-hover:bg-green-100 dark:group-hover:bg-green-900/30 transition-colors">
              <BiRepost className="w-5 h-5" />
            </div>
            <span className="text-sm">0</span>
          </button>

          {/* Likes */}
          <button
            className={`flex items-center gap-1 group ${
              isLiked ? "text-red-500" : "text-gray-500 hover:text-red-500"
            }`}
            onClick={handleLikePost}
            disabled={isLiking}
          >
            <div
              className={`p-2 rounded-full ${
                isLiked
                  ? "bg-red-100 dark:bg-red-900/30"
                  : "group-hover:bg-red-100 dark:group-hover:bg-red-900/30"
              } transition-colors`}
            >
              {isLiked ? (
                <FaHeart className="w-4 h-4" />
              ) : (
                <FaRegHeart className="w-4 h-4" />
              )}
            </div>
            <span className={`text-sm ${isLiked ? "text-red-500" : ""}`}>
              {post.likes.length}
            </span>
          </button>

          {/* Bookmarks */}
          <button
            className="flex items-center gap-1 text-gray-500 hover:text-blue-500 group"
            onClick={toggleBookmark}
          >
            <div className="p-2 rounded-full group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
              {isBookmarked ? (
                <FaBookmark className="w-4 h-4" />
              ) : (
                <FaRegBookmark className="w-4 h-4" />
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Comments Modal */}
      <dialog
        id={`comments_modal${post._id}`}
        className="modal border-none outline-none"
      >
        <div className="modal-box rounded border border-gray-600">
          <h3 className="font-bold text-lg mb-4">COMMENTS</h3>
          <div className="flex flex-col gap-3 max-h-60 overflow-auto">
            {post.comments.length === 0 && (
              <p className="text-sm text-slate-500">
                No comments yet 🤔 Be the first one 😉
              </p>
            )}
            {post.comments.map((comment) => (
              <div key={comment._id} className="flex gap-2 items-start">
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <img
                      src={comment.user.profileImg || "/avatar-placeholder.png"}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="font-bold">{comment.user.fullName}</span>
                    <span className="text-gray-700 text-sm">
                      @{comment.user.username}
                    </span>
                  </div>
                  <div className="text-sm">{comment.text}</div>
                </div>
              </div>
            ))}
          </div>
          <form
            className="flex gap-2 items-center mt-4 border-t border-gray-600 pt-2"
            onSubmit={handlePostComment}
          >
            <textarea
              className="textarea w-full p-1 rounded text-md resize-none border focus:outline-none  border-gray-800"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button className="btn btn-primary rounded-full btn-sm text-white px-4">
              {isCommenting ? <LoadingSpinner size="md" /> : "Post"}
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button className="outline-none">close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Post;
