import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="static flex justify-between items-center p-2 m-2">
      <div> &lt; </div>
      <div onClick={() => navigate("/admin")} className="cursor-pointer">
        Profile
      </div>
    </div>
  );
};

export default Header;
