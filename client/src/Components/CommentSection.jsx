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
        console.log(data);
        setComments(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div>
      {comments.map((comment) => (
        <CommentCard key={comment._id} {...comments} />
      ))}
    </div>
  );
};

export default CommentSection;
