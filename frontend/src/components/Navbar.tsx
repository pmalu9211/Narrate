import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentUser, showSiginCard } from "../recoil/state";
import { useMemo, useState } from "react";
import { Loader } from "./Loader";
import { notifyError, notifySuccess } from "../toast/toast";
export const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // const userValT = useRecoilValue(user);
  const [currentUserVal, setCurrentUser] = useRecoilState(currentUser);
  const setShowSiginCard = useSetRecoilState(showSiginCard);
  let postRedirect = useMemo(() => {
    return currentUserVal ? "/post" : "";
  }, [currentUserVal]);
  const [Loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/user/logout", {});
      setCurrentUser(undefined);
      setLoading(false);
      notifySuccess(response.data.message);
      navigate("/signin");
    } catch (e: any) {
      setLoading(false);
      console.log(e);
      notifyError(e.response.data.message);
    }
  };

  // if (userVal.state === "hasError") return <div>Loading...</div>;
  return (
    <>
      {Loading && <Loader />}
      <div className="grid grid-cols-3 gap-4 min-w-full py-6 px-2 sm:px-4  border-black items-center ">
        <Link to={"/"} className="font-poppins font-bold text-4xl  ">
          Narrate
        </Link>

        <Link
          to={postRedirect}
          onClick={() => {
            if (!currentUserVal) {
              setShowSiginCard(true);
            }
          }}
          className="font-poppins text-2xl border-2 border-black rounded-full py-2 sm:px-6 px-4 font-semibold m-auto shadow-stone-300 shadow-lg hover:bg-black hover:text-white "
        >
          post
        </Link>
        {pathname === "/profile" ? (
          <button onClick={logout} className="ml-auto max-w-32 bg-red-500 my-0">
            Logout
          </button>
        ) : currentUserVal ? (
          <Link
            to={"/profile"}
            className="ml-auto flex gap-2  py-2 px-4 font-poppins border border-gray-400 rounded-3xl min-w-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8 hidden sm:visible"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            <div className="text-xl">{currentUserVal?.name}</div>
          </Link>
        ) : (
          <button
            onClick={() => navigate("/signin")}
            className="ml-auto max-w-32 bg-black text-white"
          >
            {" "}
            Sign in
          </button>
        )}
      </div>
    </>
  );
};
