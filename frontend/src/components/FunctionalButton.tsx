import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentUser, showSiginCard } from "../recoil/state";

export const FunctionalButton = () => {
  const [isRotated, setIsRotated] = useState(false);
  const { pathname } = useLocation();
  const currentUserVal = useRecoilValue(currentUser);
  const setShowSiginCard = useSetRecoilState(showSiginCard);
  let postRedirect = useMemo(() => {
    return currentUserVal ? "/post" : "";
  }, [currentUserVal]);
  return (
    <>
      <div
        onClick={() => setIsRotated((e) => !e)}
        className={`text-7xl fixed right-0 bottom-0 bg-black text-white mr-6 mb-16 max-h-16 rounded-full cursor-pointer transition-transform duration-700 ${
          isRotated ? "-rotate-45" : ""
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-14 w-14"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
      <div
        className={`w-52 right-0 bottom-0 mb-32 mr-8 fixed text-white p-4 rounded-3xl transition-all duration-700 ${
          !isRotated ? "translate-x-80" : ""
        }`}
      >
        <Link
          to={postRedirect}
          onClick={() => {
            setIsRotated((e) => !e);
            if (!currentUserVal) {
              setShowSiginCard(true);
            }
          }}
          className="mb-2 px-4 bg-black block font-poppins text-2xl border-2 border-black rounded-full py-2  font-semibold"
        >
          post
        </Link>
        {pathname === "/" ? (
          <Link
            to={"/profile"}
            className="px-4 bg-black block font-poppins text-2xl border-2 border-black rounded-full py-2 mx-auto font-semibold"
            onClick={() => setIsRotated((e) => !e)}
          >
            Profile
          </Link>
        ) : (
          <Link
            to={"/"}
            className="px-4 bg-black block font-poppins text-2xl border-2 border-black rounded-full py-2 mx-auto font-semibold"
            onClick={() => setIsRotated((e) => !e)}
          >
            Home
          </Link>
        )}
      </div>
    </>
  );
};
