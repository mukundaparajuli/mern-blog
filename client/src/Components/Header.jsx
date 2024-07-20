import { useContext, useState } from "react";
import ProfileCard from "./ProfileCard";
import profile from "../assets/profile.png";
import backButton from "../assets/back.png";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../store/userContext";
import PromptToLogin from "./PromptToLogin";

const Header = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const userInfo = useContext(UserContext);
  const handleGetBack = () => {
    navigate(-1);
  };

  const changeShowStatus = () => {
    setShow(!show);
    console.log(userInfo);
    console.log("changed successfully!");
  };

  const closePrompt = () => {
    setShow(false);
  };
  return (
    <div className="w-full flex justify-between items-center p-2 m-2">
      <button onClick={() => handleGetBack()}>
        <img src={backButton} alt="Back" className="h-8 w-8" />{" "}
      </button>
      <div className="cursor-pointer">
        <div onClick={changeShowStatus} className="flex gap-2 items-center">
          <img src={profile} alt="" className="h-8 w-8" />
          <span className="font-bold text-lg">Profile</span>
        </div>
        {show &&
          (userInfo.userInfo ? (
            <ProfileCard setShow={setShow} />
          ) : (
            <PromptToLogin onClose={closePrompt} feature={"view the profile"} />
          ))}
      </div>
    </div>
  );
};

export default Header;
