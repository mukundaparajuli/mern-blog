import { useState } from "react";
import ProfileCard from "./ProfileCard";

const Header = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="static flex justify-between items-center p-2 m-2">
      <div> &lt; </div>
      <div className="cursor-pointer">
        <div onClick={() => setShow(!show)}>Profile</div>
        {show && <ProfileCard />}
      </div>
    </div>
  );
};

export default Header;
