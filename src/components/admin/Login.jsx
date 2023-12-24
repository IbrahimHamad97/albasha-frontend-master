import SharedFormInput from "../sharedFormInput";
import { colors } from "../colors";
import { useState } from "react";
import { toast } from "react-toastify";
import { loginHTTP } from "../../api/admin.controller";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
const Login = () => {
  const [authData, setauthData] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);

  const login = async () => {
    if (authData.email && authData.password) {
      const res = await loginHTTP(authData);
      if (res.token) {
        localStorage.setItem("token", res.token);
        setTimeout(() => {
          window.location.reload();
        }, 300);
      }
    } else {
      toast.error("Need to have both email and password", {
        theme: "dark",
      });
    }
  };

  return (
    <div>
      <h1
        className="text-4xl text-center mb-8 font-bold"
        style={{ color: colors.black }}
      >
        LOGIN
      </h1>
      <div className="mb-8">
        <div className="mb-4">
          <label>Email</label>
          <SharedFormInput
            width="100%"
            placeholder="Email"
            val={authData.email}
            change={(e) => setauthData({ ...authData, email: e.target.value })}
          />
        </div>
        <div className="relative">
          <label>Password</label>
          <SharedFormInput
            width="100%"
            placeholder="Password"
            type={showPass ? "text" : "password"}
            val={authData.password}
            change={(e) =>
              setauthData({ ...authData, password: e.target.value })
            }
          />
          <div className="absolute right-[10px] bottom-[14px]">
            {!showPass && (
              <AiFillEye
                size={20}
                onClick={() => setShowPass(true)}
                className="cursor-pointer"
              />
            )}
            {showPass && (
              <AiFillEyeInvisible
                size={20}
                onClick={() => setShowPass(false)}
                className="cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>
      <button
        className="mx-auto border-[3px] bg-white border-black rounded-xl py-3 w-full font-medium
            gen-anim hover:bg-black hover:text-white"
        onClick={login}
      >
        Log in
      </button>
    </div>
  );
};

export default Login;
