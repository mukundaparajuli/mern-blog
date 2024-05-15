import React from "react";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  const categories = [
    "Technology",
    "Travel",
    "Food",
    "Fashion",
    "Health & Fitness",
    "Lifestyle",
    "Finance",
    "Education",
    "Entertainment",
    "Sports",
    "Business",
    "DIY & Crafts",
    "Science",
    "Politics",
    "Parenting",
    "Art & Culture",
    "Music",
    "Gaming",
    "Books",
    "Photography",
  ];
  const redirectToBlogsByCategory = (cat) => {
    console.log(cat);
    navigate(`/category/${cat}`);
  };
  return (
    <div className="flex flex-wrap h-auto px-8">
      {categories.map((category, index) => (
        <button
          key={index}
          className="bg-white text-black font-bold text-md py-1 px-2 m-1 rounded-md border border-slate-300 transition duration-300 ease-in-out hover:bg-black hover:text-white active:bg-black active:text-white"
          onClick={() => redirectToBlogsByCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Categories;
