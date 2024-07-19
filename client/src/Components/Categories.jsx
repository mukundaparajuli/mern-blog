import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  const categories = [
    "React JS",
    "Node JS",
    "Express JS",
    "Mongo DB",
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
    navigate(`/category/${cat}`);
  };
  return (
    <div className="px-8 w-full flex justify-center ">
      <div className="flex flex-wrap justify-center h-auto w-2/3">
        <NavLink
          to={"/"}
          className="bg-white text-black font-bold text-md py-1 px-2 m-1 rounded-md border border-slate-300 transition duration-300 ease-in-out hover:bg-black hover:text-white active:bg-black active:text-white"
        >
          All
        </NavLink>
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
    </div>
  );
};

export default Categories;
