import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";

const CommentSection = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  console.log(blogId);

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await fetch(
          "https://techtonic-backend.onrender.com/api/comment/getComment/" + blogId,
          {
            method: "GET",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, [blogId]);

  return (
    <div className="bg-white">
      {comments.map((comment) => (
        <CommentCard key={comment._id} {...comment} />
      ))}
    </div>
  );
};

export default CommentSection;
