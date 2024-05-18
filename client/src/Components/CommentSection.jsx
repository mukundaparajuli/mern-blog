import React, { useEffect, useState } from "react";
import CommentCard from "./CommentCard";

const CommentSection = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const getComments = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/comment/getComment/" + blogId,
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

  useEffect(() => {
    getComments();
  }, [comments]);

  return (
    <div className="bg-white">
      {comments.map((comment) => (
        <CommentCard key={comment._id} {...comment} />
      ))}
    </div>
  );
};

export default CommentSection;
