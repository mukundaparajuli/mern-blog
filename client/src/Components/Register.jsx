const Register = () => {
  return (
    <div className="bg-slate-400 h-[100vh] flex justify-center items-center">
      <div className="h-2/3 w-3/5 bg-white rounded-lg">
        <div>
          <img src="" alt="" />
          <form className="bg-green text-black">
            <input type="text" name="username" id="username" />
            <input type="text" name="email" id="email" />
            <input type="text" name="password" id="password" />
          </form>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Register;
