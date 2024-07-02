import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { currentUser, showSiginCard } from "../recoil/state";
import { Loader } from "./Loader";

export const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setCurrentUser = useSetRecoilState(currentUser);
  const setSigninCard = useSetRecoilState(showSiginCard);
  const [Loading, setLoading] = useState(false);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/user/signin", {
        email,
        password,
      });
      console.log(response);
      setCurrentUser(response.data.userDoc);
      setSigninCard(false);
      setLoading(false);
      navigate("/");
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  return (
    <>
      {Loading && <Loader />}
      <div className="flex flex-col m-8 ">
        <form className="border-2 border-black rounded-2xl p-8 m-4 my-auto">
          <div className="text-center text-3xl font-semibold font-playwrite ">
            Sign In
          </div>
          <label htmlFor="Name"> Email</label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            className=""
            type="text"
          />
          <label htmlFor="Name"> Password</label>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            className=""
            type="text"
          />
          <div className="flex gap-2 font-poppins">
            <div>Not registered?</div>
            <Link className="underline" to={"/signup"}>
              {" "}
              SignUp
            </Link>
          </div>
          <button onClick={(e) => submitHandler(e)} type="submit">
            {" "}
            submit
          </button>
        </form>
      </div>
    </>
  );
};
