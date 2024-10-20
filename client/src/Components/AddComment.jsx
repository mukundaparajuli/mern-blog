import { useContext, useState } from "react";
import { UserContext } from "../store/userContext";
import PromptToLogin from "./PromptToLogin";

const AddComment = ({ blogId }) => {
  const { userInfo } = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);

  const addComment = async () => {
    if (!userInfo) {
      setShowPrompt(true);
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:5000/api/comment/addComment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            commentText: comment,
            userId: userInfo.userId,
            blogId: blogId,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setComment("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closePrompt = () => {
    setShowPrompt(false);
  };
  return (
    <>
      {showPrompt && (
        <PromptToLogin onClose={closePrompt} feature={"add a comment"} />
      )}
      <div className="gap-2 flex">
        <input
          type="text"
          name="commentText"
          id="commentText"
          placeholder="Comment here!"
          className="p-2 w-4/5 rounded-lg"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="rounded-lg p-2 w-1/5 bg-black text-white"
          onClick={() => addComment()}
        >
          Comment
        </button>
      </div>
    </>
  );
};

export default AddComment;
