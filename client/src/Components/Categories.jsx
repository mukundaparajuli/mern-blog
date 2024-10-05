import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState(null);
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
    setActiveCategory(cat); // Set the clicked category as active
    navigate(`/category/${cat}`);
  };

  return (
    <div className="px-8 w-full flex justify-center">
      <div className="flex flex-wrap justify-center h-auto w-2/3">
        <NavLink
          to={"/"}
          className={` font-bold text-md py-1 px-2 m-1 rounded-md border border-slate-300 transition duration-300 ease-in-out 
            ${
              activeCategory === null
                ? "bg-black text-white"
                : "hover:bg-black hover:text-white active:bg-black active:text-white bg-white text-black"
            }`}
          onClick={() => redirectToBlogsByCategory(null)}
        >
          All
        </NavLink>
        {categories.map((category, index) => (
          <button
            key={index}
            className={`font-bold text-md py-1 px-2 m-1 rounded-md border border-slate-300 transition duration-300 ease-in-out
              ${
                activeCategory === category
                  ? "bg-black text-white"
                  : "hover:bg-black hover:text-white active:bg-black active:text-white bg-white text-black"
              }`}
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
